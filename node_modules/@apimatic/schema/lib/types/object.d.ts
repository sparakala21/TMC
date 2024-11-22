import { Schema, SchemaMappedType, SchemaType } from '../schema';
import { OptionalizeObject } from '../typeUtils';
declare type AnyObjectSchema = Record<string, [
    string,
    Schema<any, any>,
    ObjectXmlOptions?
]>;
declare type AllValues<T extends AnyObjectSchema> = {
    [P in keyof T]: {
        key: P;
        value: T[P][0];
        schema: T[P][1];
    };
}[keyof T];
export declare type MappedObjectType<T extends AnyObjectSchema> = OptionalizeObject<{
    [P in AllValues<T>['value']]: SchemaMappedType<Extract<AllValues<T>, {
        value: P;
    }>['schema']>;
}>;
export declare type ObjectType<T extends AnyObjectSchema> = OptionalizeObject<{
    [K in keyof T]: SchemaType<T[K][1]>;
}>;
export interface ObjectXmlOptions {
    isAttr?: boolean;
    xmlName?: string;
}
export interface StrictObjectSchema<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>> extends Schema<ObjectType<T>, MappedObjectType<T>> {
    readonly objectSchema: T;
}
export interface ObjectSchema<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>> extends Schema<ObjectType<T> & {
    [key: string]: unknown;
}, MappedObjectType<T> & {
    [key: string]: unknown;
}> {
    readonly objectSchema: T;
}
/**
 * Create a Strict Object type schema.
 *
 * A strict-object does not allow additional properties during mapping or
 * unmapping. Additional properties will result in a validation error.
 */
export declare function strictObject<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>>(objectSchema: T): StrictObjectSchema<V, T>;
/**
 * Create an Expandable Object type schema.
 *
 * The object schema allows additional properties during mapping and unmapping. The
 * additional properties are copied over as is.
 */
export declare function expandoObject<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>>(objectSchema: T): ObjectSchema<V, T>;
/**
 * Create an Object Type schema.
 *
 * The Object schema allows additional properties during mapping and unmapping
 * but discards them.
 */
export declare function object<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>>(objectSchema: T): StrictObjectSchema<V, T>;
/**
 * Create a strict-object schema that extends an existing schema.
 */
export declare function extendStrictObject<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>, A extends string, B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>>(parentObjectSchema: StrictObjectSchema<V, T>, objectSchema: B): StrictObjectSchema<string, T & B>;
/**
 * Create an object schema that extends an existing schema.
 */
export declare function extendExpandoObject<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>, A extends string, B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>>(parentObjectSchema: ObjectSchema<V, T>, objectSchema: B): ObjectSchema<string, T & B>;
/**
 * Create an Object schema that extends an existing object schema.
 */
export declare function extendObject<V extends string, T extends Record<string, [V, Schema<any, any>, ObjectXmlOptions?]>, A extends string, B extends Record<string, [A, Schema<any, any>, ObjectXmlOptions?]>>(parentObjectSchema: StrictObjectSchema<V, T>, objectSchema: B): StrictObjectSchema<string, T & B>;
export {};
//# sourceMappingURL=object.d.ts.map