import {
  Schema,
  SchemaContextCreator,
  SchemaMappedType,
  SchemaType,
  SchemaValidationError,
} from '../schema';
import { OptionalizeObject } from '../typeUtils';
import {
  isOptional,
  isOptionalNullable,
  isOptionalOrNullableType,
  literalToString,
  objectEntries,
  objectKeyEncode,
  omitKeysFromObject,
} from '../utils';

type AnyObjectSchema = Record<
  string,
  [string, Schema<any, any>, ObjectXmlOptions?]
>;

type AllValues<T extends AnyObjectSchema> = {
  [P in keyof T]: { key: P; value: T[P][0]; schema: T[P][1] };
}[keyof T];

export type MappedObjectType<T extends AnyObjectSchema> = OptionalizeObject<
  {
    [P in AllValues<T>['value']]: SchemaMappedType<
      Extract<AllValues<T>, { value: P }>['schema']
    >;
  }
>;

export type ObjectType<T extends AnyObjectSchema> = OptionalizeObject<
  {
    [K in keyof T]: SchemaType<T[K][1]>;
  }
>;

export interface ObjectXmlOptions {
  isAttr?: boolean;
  xmlName?: string;
}

export interface StrictObjectSchema<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
> extends Schema<ObjectType<T>, MappedObjectType<T>> {
  readonly objectSchema: T;
}

export interface ObjectSchema<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
> extends Schema<
    ObjectType<T> & { [key: string]: unknown },
    MappedObjectType<T> & { [key: string]: unknown }
  > {
  readonly objectSchema: T;
}

/**
 * Create a Strict Object type schema.
 *
 * A strict-object does not allow additional properties during mapping or
 * unmapping. Additional properties will result in a validation error.
 */
export function strictObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
>(objectSchema: T): StrictObjectSchema<V, T> {
  const schema = internalObject(objectSchema, false, false);
  schema.type = () =>
    `StrictObject<{${Object.keys(objectSchema)
      .map(objectKeyEncode)
      .join(',')}}>`;
  return schema;
}

/**
 * Create an Expandable Object type schema.
 *
 * The object schema allows additional properties during mapping and unmapping. The
 * additional properties are copied over as is.
 */
export function expandoObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
>(objectSchema: T): ObjectSchema<V, T> {
  return internalObject(objectSchema, true, true);
}

/**
 * Create an Object Type schema.
 *
 * The Object schema allows additional properties during mapping and unmapping
 * but discards them.
 */
export function object<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
>(objectSchema: T): StrictObjectSchema<V, T> {
  const schema = internalObject(objectSchema, true, false);
  schema.type = () =>
    `Object<{${Object.keys(objectSchema).map(objectKeyEncode).join(',')}}>`;
  return schema;
}

/**
 * Create a strict-object schema that extends an existing schema.
 */
export function extendStrictObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>,
  A extends string,
  B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>
>(
  parentObjectSchema: StrictObjectSchema<V, T>,
  objectSchema: B
): StrictObjectSchema<string, T & B> {
  return strictObject({ ...parentObjectSchema.objectSchema, ...objectSchema });
}

/**
 * Create an object schema that extends an existing schema.
 */
export function extendExpandoObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>,
  A extends string,
  B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>
>(
  parentObjectSchema: ObjectSchema<V, T>,
  objectSchema: B
): ObjectSchema<string, T & B> {
  return expandoObject({ ...parentObjectSchema.objectSchema, ...objectSchema });
}

/**
 * Create an Object schema that extends an existing object schema.
 */
export function extendObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>,
  A extends string,
  B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>
>(
  parentObjectSchema: StrictObjectSchema<V, T>,
  objectSchema: B
): StrictObjectSchema<string, T & B> {
  return object({ ...parentObjectSchema.objectSchema, ...objectSchema });
}

/**
 * Internal utility to create object schema with different options.
 */
function internalObject<
  V extends string,
  T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>
>(
  objectSchema: T,
  skipValidateAdditionalProps: boolean,
  mapAdditionalProps: boolean
): StrictObjectSchema<V, T> {
  const keys = Object.keys(objectSchema);
  const reverseObjectSchema = createReverseObjectSchema<T>(objectSchema);
  const xmlMappingInfo = getXmlPropMappingForObjectSchema(objectSchema);
  const xmlObjectSchema = createXmlObjectSchema(objectSchema);
  const reverseXmlObjectSchema = createReverseXmlObjectSchema(xmlObjectSchema);
  return {
    type: () => `Object<{${keys.map(objectKeyEncode).join(',')},...}>`,
    validateBeforeMap: validateObject(
      objectSchema,
      'validateBeforeMap',
      skipValidateAdditionalProps
    ),
    validateBeforeUnmap: validateObject(
      reverseObjectSchema,
      'validateBeforeUnmap',
      skipValidateAdditionalProps
    ),
    map: mapObject(objectSchema, 'map', mapAdditionalProps),
    unmap: mapObject(reverseObjectSchema, 'unmap', mapAdditionalProps),
    validateBeforeMapXml: validateObjectBeforeMapXml(
      objectSchema,
      xmlMappingInfo,
      skipValidateAdditionalProps
    ),
    mapXml: mapObjectFromXml(xmlObjectSchema, mapAdditionalProps),
    unmapXml: unmapObjectToXml(reverseXmlObjectSchema, mapAdditionalProps),
    objectSchema,
  };
}

function validateObjectBeforeMapXml(
  objectSchema: Record<string, [string, Schema<any>, ObjectXmlOptions?]>,
  xmlMappingInfo: ReturnType<typeof getXmlPropMappingForObjectSchema>,
  allowAdditionalProperties: boolean
) {
  const { elementsToProps, attributesToProps } = xmlMappingInfo;
  return (
    value: unknown,
    ctxt: SchemaContextCreator
  ): SchemaValidationError[] => {
    if (typeof value !== 'object' || value === null) {
      return ctxt.fail();
    }
    if (Array.isArray(value)) {
      return ctxt.fail(
        `Expected value to be of type '${
          ctxt.type
        }' but found 'Array<${typeof value}>'.`
      );
    }
    const valueObject = value as {
      $?: Record<string, unknown>;
      [key: string]: unknown;
    };
    const { $: attrs, ...elements } = valueObject;
    const attributes = attrs ?? {};

    // Validate all known elements and attributes using the schema
    return [
      ...validateValueObject({
        validationMethod: 'validateBeforeMapXml',
        propTypeName: 'child elements',
        propTypePrefix: 'element',
        valueTypeName: 'element',
        propMapping: elementsToProps,
        objectSchema,
        valueObject: elements,
        ctxt,
        allowAdditionalProperties,
      }),
      ...validateValueObject({
        validationMethod: 'validateBeforeMapXml',
        propTypeName: 'attributes',
        propTypePrefix: '@',
        valueTypeName: 'element',
        propMapping: attributesToProps,
        objectSchema,
        valueObject: attributes,
        ctxt,
        allowAdditionalProperties,
      }),
    ];
  };
}

function mapObjectFromXml(
  xmlObjectSchema: XmlObjectSchema,
  allowAdditionalProps: boolean
) {
  const { elementsSchema, attributesSchema } = xmlObjectSchema;
  const mapElements = mapObject(elementsSchema, 'mapXml', allowAdditionalProps);
  const mapAttributes = mapObject(
    attributesSchema,
    'mapXml',
    false // Always false; additional attributes are handled differently below.
  );

  // These are later used to omit know attribute props from the attributes object
  // so that the remaining props can be copied over as additional props.
  const attributeKeys = objectEntries(attributesSchema).map(
    ([_, [name]]) => name
  );

  return (value: unknown, ctxt: SchemaContextCreator): any => {
    const valueObject = value as {
      $?: Record<string, unknown>;
      [key: string]: unknown;
    };
    const { $: attrs, ...elements } = valueObject;
    const attributes = attrs ?? {};

    const output: Record<string, unknown> = {
      ...mapAttributes(attributes, ctxt),
      ...mapElements(elements, ctxt),
    };

    if (allowAdditionalProps) {
      // Omit known attributes and copy the rest as additional attributes.
      const additionalAttrs = omitKeysFromObject(attributes, attributeKeys);
      if (Object.keys(additionalAttrs).length > 0) {
        // These additional attrs are set in the '$' property by convention.
        output.$ = additionalAttrs;
      }
    }

    return output;
  };
}

function unmapObjectToXml(
  xmlObjectSchema: XmlObjectSchema,
  allowAdditionalProps: boolean
) {
  const { elementsSchema, attributesSchema } = xmlObjectSchema;
  const mapElements = mapObject(
    elementsSchema,
    'unmapXml',
    allowAdditionalProps
  );
  const mapAttributes = mapObject(
    attributesSchema,
    'unmapXml',
    false // Always false so that element props are not copied during mapping
  );

  // These are later used to omit attribute props from the value object so that they
  // do not get mapped during element mapping, if the allowAdditionalProps is true.
  const attributeKeys = objectEntries(attributesSchema).map(
    ([_, [name]]) => name
  );

  return (value: unknown, ctxt: SchemaContextCreator): any => {
    // Get additional attributes which are set in the '$' property by convention
    const { $: attributes, ...rest } = value as {
      $?: unknown;
      [key: string]: unknown;
    };

    // Ensure 'attributes' is an object and non-null
    const additionalAttributes =
      typeof attributes === 'object' &&
      attributes !== null &&
      allowAdditionalProps
        ? attributes
        : {};

    return {
      ...mapElements(omitKeysFromObject(rest, attributeKeys), ctxt),
      $: { ...additionalAttributes, ...mapAttributes(value, ctxt) },
    };
  };
}

function validateValueObject({
  validationMethod,
  propTypeName,
  propTypePrefix,
  valueTypeName,
  propMapping,
  objectSchema,
  valueObject,
  ctxt,
  allowAdditionalProperties,
}: {
  validationMethod:
    | 'validateBeforeMap'
    | 'validateBeforeUnmap'
    | 'validateBeforeMapXml';
  propTypeName: string;
  propTypePrefix: string;
  valueTypeName: string;
  propMapping: Record<string, string>;
  objectSchema: AnyObjectSchema;
  valueObject: { [key: string]: unknown };
  ctxt: SchemaContextCreator;
  allowAdditionalProperties: boolean;
}) {
  const errors: SchemaValidationError[] = [];
  const missingProps: Set<string> = new Set();
  const unknownProps: Set<string> = new Set(Object.keys(valueObject));

  // Validate all known properties using the schema
  for (const key in propMapping) {
    if (Object.prototype.hasOwnProperty.call(propMapping, key)) {
      const propName = propMapping[key];
      const schema = objectSchema[propName][1];
      unknownProps.delete(key);
      if (key in valueObject) {
        errors.push(
          ...schema[validationMethod](
            valueObject[key],
            ctxt.createChild(propTypePrefix + key, valueObject[key], schema)
          )
        );
      } else if (!isOptionalOrNullableType(schema.type())) {
        // Add to missing keys if it is not an optional property
        missingProps.add(key);
      }
    }
  }

  // Create validation error for unknown properties encountered
  const unknownPropsArray = Array.from(unknownProps);
  if (unknownPropsArray.length > 0 && !allowAdditionalProperties) {
    errors.push(
      ...ctxt.fail(
        `Some unknown ${propTypeName} were found in the ${valueTypeName}: ${unknownPropsArray
          .map(literalToString)
          .join(', ')}.`
      )
    );
  }

  // Create validation error for missing required properties
  const missingPropsArray = Array.from(missingProps);
  if (missingPropsArray.length > 0) {
    errors.push(
      ...ctxt.fail(
        `Some ${propTypeName} are missing in the ${valueTypeName}: ${missingPropsArray
          .map(literalToString)
          .join(', ')}.`
      )
    );
  }

  return errors;
}

function validateObject(
  objectSchema: AnyObjectSchema,
  validationMethod:
    | 'validateBeforeMap'
    | 'validateBeforeUnmap'
    | 'validateBeforeMapXml',
  allowAdditionalProperties: boolean
) {
  const propsMapping = getPropMappingForObjectSchema(objectSchema);
  return (value: unknown, ctxt: SchemaContextCreator) => {
    if (typeof value !== 'object' || value === null) {
      return ctxt.fail();
    }
    if (Array.isArray(value)) {
      return ctxt.fail(
        `Expected value to be of type '${
          ctxt.type
        }' but found 'Array<${typeof value}>'.`
      );
    }
    return validateValueObject({
      validationMethod,
      propTypeName: 'properties',
      propTypePrefix: '',
      valueTypeName: 'object',
      propMapping: propsMapping,
      objectSchema,
      valueObject: value as Record<string, unknown>,
      ctxt,
      allowAdditionalProperties,
    });
  };
}

function mapObject<T extends AnyObjectSchema>(
  objectSchema: T,
  mappingFn: 'map' | 'unmap' | 'mapXml' | 'unmapXml',
  allowAdditionalProperties: boolean
) {
  return (value: unknown, ctxt: SchemaContextCreator): any => {
    const output: Record<string, unknown> = {};
    const objectValue = value as Record<string, any>;
    /** Properties seen in the object but not in the schema */
    const unknownKeys = new Set(Object.keys(objectValue));

    // Map known properties using the schema
    for (const key in objectSchema) {
      if (!Object.prototype.hasOwnProperty.call(objectSchema, key)) {
        continue;
      }

      const element = objectSchema[key];
      const propName = element[0];
      const propValue = objectValue[propName];
      unknownKeys.delete(propName);

      if (isOptionalNullable(element[1].type(), propValue)) {
        if (typeof propValue === 'undefined') {
          // Skip mapping to avoid creating properties with value 'undefined'
          continue;
        }
        output[key] = null;
        continue;
      }

      if (isOptional(element[1].type(), propValue)) {
        // Skip mapping to avoid creating properties with value 'undefined'
        continue;
      }

      output[key] = element[1][mappingFn](
        propValue,
        ctxt.createChild(propName, propValue, element[1])
      );
    }

    // Copy unknown properties over if additional properties flag is set
    if (allowAdditionalProperties) {
      unknownKeys.forEach((unknownKey) => {
        output[unknownKey] = objectValue[unknownKey];
      });
    }
    return output;
  };
}

function getXmlPropMappingForObjectSchema(objectSchema: AnyObjectSchema) {
  const elementsToProps: Record<string, string> = {};
  const attributesToProps: Record<string, string> = {};

  for (const key in objectSchema) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
      const [propName, , xmlOptions] = objectSchema[key];
      if (xmlOptions?.isAttr === true) {
        attributesToProps[xmlOptions.xmlName ?? propName] = key;
      } else {
        elementsToProps[xmlOptions?.xmlName ?? propName] = key;
      }
    }
  }

  return { elementsToProps, attributesToProps };
}

function getPropMappingForObjectSchema(
  objectSchema: AnyObjectSchema
): Record<string, string> {
  const propsMapping: Record<string, string> = {};
  for (const key in objectSchema) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
      const propDef = objectSchema[key];
      propsMapping[propDef[0]] = key;
    }
  }
  return propsMapping;
}

function createReverseObjectSchema<T extends AnyObjectSchema>(
  objectSchema: T
): AnyObjectSchema {
  const reverseObjectSchema: AnyObjectSchema = {};
  for (const key in objectSchema) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
      const element = objectSchema[key];
      reverseObjectSchema[element[0]] = [key, element[1], element[2]];
    }
  }
  return reverseObjectSchema;
}

interface XmlObjectSchema {
  elementsSchema: AnyObjectSchema;
  attributesSchema: AnyObjectSchema;
}

function createXmlObjectSchema(objectSchema: AnyObjectSchema): XmlObjectSchema {
  const elementsSchema: AnyObjectSchema = {};
  const attributesSchema: AnyObjectSchema = {};
  for (const key in objectSchema) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
      const element = objectSchema[key];
      const [serializedName, schema, xmlOptions] = element;
      const xmlObjectSchema = xmlOptions?.isAttr
        ? attributesSchema
        : elementsSchema;
      xmlObjectSchema[key] = [
        xmlOptions?.xmlName ?? serializedName,
        schema,
        xmlOptions,
      ];
    }
  }
  return { elementsSchema, attributesSchema };
}

function createReverseXmlObjectSchema(
  xmlObjectSchema: XmlObjectSchema
): XmlObjectSchema {
  return {
    attributesSchema: createReverseObjectSchema(
      xmlObjectSchema.attributesSchema
    ),
    elementsSchema: createReverseObjectSchema(xmlObjectSchema.elementsSchema),
  };
}
