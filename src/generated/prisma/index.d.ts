
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Binder
 * A physical binder with a fixed page layout
 */
export type Binder = $Result.DefaultSelection<Prisma.$BinderPayload>
/**
 * Model Page
 * A single page within a binder
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model Slot
 * A slot at a specific row/col position on a page
 */
export type Slot = $Result.DefaultSelection<Prisma.$SlotPayload>
/**
 * Model CatalogCard
 * Cached card data from the external catalog
 */
export type CatalogCard = $Result.DefaultSelection<Prisma.$CatalogCardPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Binders
 * const binders = await prisma.binder.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Binders
   * const binders = await prisma.binder.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.binder`: Exposes CRUD operations for the **Binder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Binders
    * const binders = await prisma.binder.findMany()
    * ```
    */
  get binder(): Prisma.BinderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slot`: Exposes CRUD operations for the **Slot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slots
    * const slots = await prisma.slot.findMany()
    * ```
    */
  get slot(): Prisma.SlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.catalogCard`: Exposes CRUD operations for the **CatalogCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CatalogCards
    * const catalogCards = await prisma.catalogCard.findMany()
    * ```
    */
  get catalogCard(): Prisma.CatalogCardDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Binder: 'Binder',
    Page: 'Page',
    Slot: 'Slot',
    CatalogCard: 'CatalogCard'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "binder" | "page" | "slot" | "catalogCard"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Binder: {
        payload: Prisma.$BinderPayload<ExtArgs>
        fields: Prisma.BinderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BinderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BinderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          findFirst: {
            args: Prisma.BinderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BinderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          findMany: {
            args: Prisma.BinderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>[]
          }
          create: {
            args: Prisma.BinderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          createMany: {
            args: Prisma.BinderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BinderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>[]
          }
          delete: {
            args: Prisma.BinderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          update: {
            args: Prisma.BinderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          deleteMany: {
            args: Prisma.BinderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BinderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BinderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>[]
          }
          upsert: {
            args: Prisma.BinderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinderPayload>
          }
          aggregate: {
            args: Prisma.BinderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBinder>
          }
          groupBy: {
            args: Prisma.BinderGroupByArgs<ExtArgs>
            result: $Utils.Optional<BinderGroupByOutputType>[]
          }
          count: {
            args: Prisma.BinderCountArgs<ExtArgs>
            result: $Utils.Optional<BinderCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Slot: {
        payload: Prisma.$SlotPayload<ExtArgs>
        fields: Prisma.SlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findFirst: {
            args: Prisma.SlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findMany: {
            args: Prisma.SlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          create: {
            args: Prisma.SlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          createMany: {
            args: Prisma.SlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          delete: {
            args: Prisma.SlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          update: {
            args: Prisma.SlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          deleteMany: {
            args: Prisma.SlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          upsert: {
            args: Prisma.SlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          aggregate: {
            args: Prisma.SlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlot>
          }
          groupBy: {
            args: Prisma.SlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SlotCountArgs<ExtArgs>
            result: $Utils.Optional<SlotCountAggregateOutputType> | number
          }
        }
      }
      CatalogCard: {
        payload: Prisma.$CatalogCardPayload<ExtArgs>
        fields: Prisma.CatalogCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          findFirst: {
            args: Prisma.CatalogCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          findMany: {
            args: Prisma.CatalogCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>[]
          }
          create: {
            args: Prisma.CatalogCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          createMany: {
            args: Prisma.CatalogCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatalogCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>[]
          }
          delete: {
            args: Prisma.CatalogCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          update: {
            args: Prisma.CatalogCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          deleteMany: {
            args: Prisma.CatalogCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CatalogCardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>[]
          }
          upsert: {
            args: Prisma.CatalogCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogCardPayload>
          }
          aggregate: {
            args: Prisma.CatalogCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalogCard>
          }
          groupBy: {
            args: Prisma.CatalogCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatalogCardCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogCardCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    binder?: BinderOmit
    page?: PageOmit
    slot?: SlotOmit
    catalogCard?: CatalogCardOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BinderCountOutputType
   */

  export type BinderCountOutputType = {
    pages: number
  }

  export type BinderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | BinderCountOutputTypeCountPagesArgs
  }

  // Custom InputTypes
  /**
   * BinderCountOutputType without action
   */
  export type BinderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinderCountOutputType
     */
    select?: BinderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BinderCountOutputType without action
   */
  export type BinderCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * Count Type PageCountOutputType
   */

  export type PageCountOutputType = {
    slots: number
  }

  export type PageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | PageCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     */
    select?: PageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
  }


  /**
   * Count Type CatalogCardCountOutputType
   */

  export type CatalogCardCountOutputType = {
    slots: number
  }

  export type CatalogCardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | CatalogCardCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * CatalogCardCountOutputType without action
   */
  export type CatalogCardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCardCountOutputType
     */
    select?: CatalogCardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CatalogCardCountOutputType without action
   */
  export type CatalogCardCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Binder
   */

  export type AggregateBinder = {
    _count: BinderCountAggregateOutputType | null
    _avg: BinderAvgAggregateOutputType | null
    _sum: BinderSumAggregateOutputType | null
    _min: BinderMinAggregateOutputType | null
    _max: BinderMaxAggregateOutputType | null
  }

  export type BinderAvgAggregateOutputType = {
    layoutRows: number | null
    layoutCols: number | null
    lastViewedPage: number | null
  }

  export type BinderSumAggregateOutputType = {
    layoutRows: number | null
    layoutCols: number | null
    lastViewedPage: number | null
  }

  export type BinderMinAggregateOutputType = {
    id: string | null
    nickname: string | null
    color: string | null
    layoutRows: number | null
    layoutCols: number | null
    lastViewedPage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BinderMaxAggregateOutputType = {
    id: string | null
    nickname: string | null
    color: string | null
    layoutRows: number | null
    layoutCols: number | null
    lastViewedPage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BinderCountAggregateOutputType = {
    id: number
    nickname: number
    color: number
    layoutRows: number
    layoutCols: number
    lastViewedPage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BinderAvgAggregateInputType = {
    layoutRows?: true
    layoutCols?: true
    lastViewedPage?: true
  }

  export type BinderSumAggregateInputType = {
    layoutRows?: true
    layoutCols?: true
    lastViewedPage?: true
  }

  export type BinderMinAggregateInputType = {
    id?: true
    nickname?: true
    color?: true
    layoutRows?: true
    layoutCols?: true
    lastViewedPage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BinderMaxAggregateInputType = {
    id?: true
    nickname?: true
    color?: true
    layoutRows?: true
    layoutCols?: true
    lastViewedPage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BinderCountAggregateInputType = {
    id?: true
    nickname?: true
    color?: true
    layoutRows?: true
    layoutCols?: true
    lastViewedPage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BinderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Binder to aggregate.
     */
    where?: BinderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Binders to fetch.
     */
    orderBy?: BinderOrderByWithRelationInput | BinderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BinderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Binders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Binders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Binders
    **/
    _count?: true | BinderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BinderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BinderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BinderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BinderMaxAggregateInputType
  }

  export type GetBinderAggregateType<T extends BinderAggregateArgs> = {
        [P in keyof T & keyof AggregateBinder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBinder[P]>
      : GetScalarType<T[P], AggregateBinder[P]>
  }




  export type BinderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BinderWhereInput
    orderBy?: BinderOrderByWithAggregationInput | BinderOrderByWithAggregationInput[]
    by: BinderScalarFieldEnum[] | BinderScalarFieldEnum
    having?: BinderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BinderCountAggregateInputType | true
    _avg?: BinderAvgAggregateInputType
    _sum?: BinderSumAggregateInputType
    _min?: BinderMinAggregateInputType
    _max?: BinderMaxAggregateInputType
  }

  export type BinderGroupByOutputType = {
    id: string
    nickname: string
    color: string
    layoutRows: number
    layoutCols: number
    lastViewedPage: number
    createdAt: Date
    updatedAt: Date
    _count: BinderCountAggregateOutputType | null
    _avg: BinderAvgAggregateOutputType | null
    _sum: BinderSumAggregateOutputType | null
    _min: BinderMinAggregateOutputType | null
    _max: BinderMaxAggregateOutputType | null
  }

  type GetBinderGroupByPayload<T extends BinderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BinderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BinderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BinderGroupByOutputType[P]>
            : GetScalarType<T[P], BinderGroupByOutputType[P]>
        }
      >
    >


  export type BinderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
    color?: boolean
    layoutRows?: boolean
    layoutCols?: boolean
    lastViewedPage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pages?: boolean | Binder$pagesArgs<ExtArgs>
    _count?: boolean | BinderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["binder"]>

  export type BinderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
    color?: boolean
    layoutRows?: boolean
    layoutCols?: boolean
    lastViewedPage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["binder"]>

  export type BinderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
    color?: boolean
    layoutRows?: boolean
    layoutCols?: boolean
    lastViewedPage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["binder"]>

  export type BinderSelectScalar = {
    id?: boolean
    nickname?: boolean
    color?: boolean
    layoutRows?: boolean
    layoutCols?: boolean
    lastViewedPage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BinderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nickname" | "color" | "layoutRows" | "layoutCols" | "lastViewedPage" | "createdAt" | "updatedAt", ExtArgs["result"]["binder"]>
  export type BinderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | Binder$pagesArgs<ExtArgs>
    _count?: boolean | BinderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BinderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BinderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BinderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Binder"
    objects: {
      pages: Prisma.$PagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nickname: string
      color: string
      layoutRows: number
      layoutCols: number
      lastViewedPage: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["binder"]>
    composites: {}
  }

  type BinderGetPayload<S extends boolean | null | undefined | BinderDefaultArgs> = $Result.GetResult<Prisma.$BinderPayload, S>

  type BinderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BinderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BinderCountAggregateInputType | true
    }

  export interface BinderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Binder'], meta: { name: 'Binder' } }
    /**
     * Find zero or one Binder that matches the filter.
     * @param {BinderFindUniqueArgs} args - Arguments to find a Binder
     * @example
     * // Get one Binder
     * const binder = await prisma.binder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BinderFindUniqueArgs>(args: SelectSubset<T, BinderFindUniqueArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Binder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BinderFindUniqueOrThrowArgs} args - Arguments to find a Binder
     * @example
     * // Get one Binder
     * const binder = await prisma.binder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BinderFindUniqueOrThrowArgs>(args: SelectSubset<T, BinderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Binder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderFindFirstArgs} args - Arguments to find a Binder
     * @example
     * // Get one Binder
     * const binder = await prisma.binder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BinderFindFirstArgs>(args?: SelectSubset<T, BinderFindFirstArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Binder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderFindFirstOrThrowArgs} args - Arguments to find a Binder
     * @example
     * // Get one Binder
     * const binder = await prisma.binder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BinderFindFirstOrThrowArgs>(args?: SelectSubset<T, BinderFindFirstOrThrowArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Binders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Binders
     * const binders = await prisma.binder.findMany()
     * 
     * // Get first 10 Binders
     * const binders = await prisma.binder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const binderWithIdOnly = await prisma.binder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BinderFindManyArgs>(args?: SelectSubset<T, BinderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Binder.
     * @param {BinderCreateArgs} args - Arguments to create a Binder.
     * @example
     * // Create one Binder
     * const Binder = await prisma.binder.create({
     *   data: {
     *     // ... data to create a Binder
     *   }
     * })
     * 
     */
    create<T extends BinderCreateArgs>(args: SelectSubset<T, BinderCreateArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Binders.
     * @param {BinderCreateManyArgs} args - Arguments to create many Binders.
     * @example
     * // Create many Binders
     * const binder = await prisma.binder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BinderCreateManyArgs>(args?: SelectSubset<T, BinderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Binders and returns the data saved in the database.
     * @param {BinderCreateManyAndReturnArgs} args - Arguments to create many Binders.
     * @example
     * // Create many Binders
     * const binder = await prisma.binder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Binders and only return the `id`
     * const binderWithIdOnly = await prisma.binder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BinderCreateManyAndReturnArgs>(args?: SelectSubset<T, BinderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Binder.
     * @param {BinderDeleteArgs} args - Arguments to delete one Binder.
     * @example
     * // Delete one Binder
     * const Binder = await prisma.binder.delete({
     *   where: {
     *     // ... filter to delete one Binder
     *   }
     * })
     * 
     */
    delete<T extends BinderDeleteArgs>(args: SelectSubset<T, BinderDeleteArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Binder.
     * @param {BinderUpdateArgs} args - Arguments to update one Binder.
     * @example
     * // Update one Binder
     * const binder = await prisma.binder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BinderUpdateArgs>(args: SelectSubset<T, BinderUpdateArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Binders.
     * @param {BinderDeleteManyArgs} args - Arguments to filter Binders to delete.
     * @example
     * // Delete a few Binders
     * const { count } = await prisma.binder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BinderDeleteManyArgs>(args?: SelectSubset<T, BinderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Binders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Binders
     * const binder = await prisma.binder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BinderUpdateManyArgs>(args: SelectSubset<T, BinderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Binders and returns the data updated in the database.
     * @param {BinderUpdateManyAndReturnArgs} args - Arguments to update many Binders.
     * @example
     * // Update many Binders
     * const binder = await prisma.binder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Binders and only return the `id`
     * const binderWithIdOnly = await prisma.binder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BinderUpdateManyAndReturnArgs>(args: SelectSubset<T, BinderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Binder.
     * @param {BinderUpsertArgs} args - Arguments to update or create a Binder.
     * @example
     * // Update or create a Binder
     * const binder = await prisma.binder.upsert({
     *   create: {
     *     // ... data to create a Binder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Binder we want to update
     *   }
     * })
     */
    upsert<T extends BinderUpsertArgs>(args: SelectSubset<T, BinderUpsertArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Binders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderCountArgs} args - Arguments to filter Binders to count.
     * @example
     * // Count the number of Binders
     * const count = await prisma.binder.count({
     *   where: {
     *     // ... the filter for the Binders we want to count
     *   }
     * })
    **/
    count<T extends BinderCountArgs>(
      args?: Subset<T, BinderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BinderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Binder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BinderAggregateArgs>(args: Subset<T, BinderAggregateArgs>): Prisma.PrismaPromise<GetBinderAggregateType<T>>

    /**
     * Group by Binder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BinderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BinderGroupByArgs['orderBy'] }
        : { orderBy?: BinderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BinderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBinderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Binder model
   */
  readonly fields: BinderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Binder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BinderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pages<T extends Binder$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Binder$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Binder model
   */
  interface BinderFieldRefs {
    readonly id: FieldRef<"Binder", 'String'>
    readonly nickname: FieldRef<"Binder", 'String'>
    readonly color: FieldRef<"Binder", 'String'>
    readonly layoutRows: FieldRef<"Binder", 'Int'>
    readonly layoutCols: FieldRef<"Binder", 'Int'>
    readonly lastViewedPage: FieldRef<"Binder", 'Int'>
    readonly createdAt: FieldRef<"Binder", 'DateTime'>
    readonly updatedAt: FieldRef<"Binder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Binder findUnique
   */
  export type BinderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter, which Binder to fetch.
     */
    where: BinderWhereUniqueInput
  }

  /**
   * Binder findUniqueOrThrow
   */
  export type BinderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter, which Binder to fetch.
     */
    where: BinderWhereUniqueInput
  }

  /**
   * Binder findFirst
   */
  export type BinderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter, which Binder to fetch.
     */
    where?: BinderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Binders to fetch.
     */
    orderBy?: BinderOrderByWithRelationInput | BinderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Binders.
     */
    cursor?: BinderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Binders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Binders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Binders.
     */
    distinct?: BinderScalarFieldEnum | BinderScalarFieldEnum[]
  }

  /**
   * Binder findFirstOrThrow
   */
  export type BinderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter, which Binder to fetch.
     */
    where?: BinderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Binders to fetch.
     */
    orderBy?: BinderOrderByWithRelationInput | BinderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Binders.
     */
    cursor?: BinderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Binders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Binders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Binders.
     */
    distinct?: BinderScalarFieldEnum | BinderScalarFieldEnum[]
  }

  /**
   * Binder findMany
   */
  export type BinderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter, which Binders to fetch.
     */
    where?: BinderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Binders to fetch.
     */
    orderBy?: BinderOrderByWithRelationInput | BinderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Binders.
     */
    cursor?: BinderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Binders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Binders.
     */
    skip?: number
    distinct?: BinderScalarFieldEnum | BinderScalarFieldEnum[]
  }

  /**
   * Binder create
   */
  export type BinderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * The data needed to create a Binder.
     */
    data: XOR<BinderCreateInput, BinderUncheckedCreateInput>
  }

  /**
   * Binder createMany
   */
  export type BinderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Binders.
     */
    data: BinderCreateManyInput | BinderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Binder createManyAndReturn
   */
  export type BinderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * The data used to create many Binders.
     */
    data: BinderCreateManyInput | BinderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Binder update
   */
  export type BinderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * The data needed to update a Binder.
     */
    data: XOR<BinderUpdateInput, BinderUncheckedUpdateInput>
    /**
     * Choose, which Binder to update.
     */
    where: BinderWhereUniqueInput
  }

  /**
   * Binder updateMany
   */
  export type BinderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Binders.
     */
    data: XOR<BinderUpdateManyMutationInput, BinderUncheckedUpdateManyInput>
    /**
     * Filter which Binders to update
     */
    where?: BinderWhereInput
    /**
     * Limit how many Binders to update.
     */
    limit?: number
  }

  /**
   * Binder updateManyAndReturn
   */
  export type BinderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * The data used to update Binders.
     */
    data: XOR<BinderUpdateManyMutationInput, BinderUncheckedUpdateManyInput>
    /**
     * Filter which Binders to update
     */
    where?: BinderWhereInput
    /**
     * Limit how many Binders to update.
     */
    limit?: number
  }

  /**
   * Binder upsert
   */
  export type BinderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * The filter to search for the Binder to update in case it exists.
     */
    where: BinderWhereUniqueInput
    /**
     * In case the Binder found by the `where` argument doesn't exist, create a new Binder with this data.
     */
    create: XOR<BinderCreateInput, BinderUncheckedCreateInput>
    /**
     * In case the Binder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BinderUpdateInput, BinderUncheckedUpdateInput>
  }

  /**
   * Binder delete
   */
  export type BinderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
    /**
     * Filter which Binder to delete.
     */
    where: BinderWhereUniqueInput
  }

  /**
   * Binder deleteMany
   */
  export type BinderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Binders to delete
     */
    where?: BinderWhereInput
    /**
     * Limit how many Binders to delete.
     */
    limit?: number
  }

  /**
   * Binder.pages
   */
  export type Binder$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Binder without action
   */
  export type BinderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Binder
     */
    select?: BinderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Binder
     */
    omit?: BinderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BinderInclude<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageAvgAggregateOutputType = {
    pageIndex: number | null
  }

  export type PageSumAggregateOutputType = {
    pageIndex: number | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    pageIndex: number | null
    binderId: string | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    pageIndex: number | null
    binderId: string | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    pageIndex: number
    binderId: number
    _all: number
  }


  export type PageAvgAggregateInputType = {
    pageIndex?: true
  }

  export type PageSumAggregateInputType = {
    pageIndex?: true
  }

  export type PageMinAggregateInputType = {
    id?: true
    pageIndex?: true
    binderId?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    pageIndex?: true
    binderId?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    pageIndex?: true
    binderId?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _avg?: PageAvgAggregateInputType
    _sum?: PageSumAggregateInputType
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: string
    pageIndex: number
    binderId: string
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageIndex?: boolean
    binderId?: boolean
    binder?: boolean | BinderDefaultArgs<ExtArgs>
    slots?: boolean | Page$slotsArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageIndex?: boolean
    binderId?: boolean
    binder?: boolean | BinderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageIndex?: boolean
    binderId?: boolean
    binder?: boolean | BinderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    pageIndex?: boolean
    binderId?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageIndex" | "binderId", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binder?: boolean | BinderDefaultArgs<ExtArgs>
    slots?: boolean | Page$slotsArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binder?: boolean | BinderDefaultArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    binder?: boolean | BinderDefaultArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      binder: Prisma.$BinderPayload<ExtArgs>
      slots: Prisma.$SlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageIndex: number
      binderId: string
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    binder<T extends BinderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BinderDefaultArgs<ExtArgs>>): Prisma__BinderClient<$Result.GetResult<Prisma.$BinderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    slots<T extends Page$slotsArgs<ExtArgs> = {}>(args?: Subset<T, Page$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'String'>
    readonly pageIndex: FieldRef<"Page", 'Int'>
    readonly binderId: FieldRef<"Page", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page.slots
   */
  export type Page$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    cursor?: SlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model Slot
   */

  export type AggregateSlot = {
    _count: SlotCountAggregateOutputType | null
    _avg: SlotAvgAggregateOutputType | null
    _sum: SlotSumAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  export type SlotAvgAggregateOutputType = {
    row: number | null
    col: number | null
  }

  export type SlotSumAggregateOutputType = {
    row: number | null
    col: number | null
  }

  export type SlotMinAggregateOutputType = {
    id: string | null
    row: number | null
    col: number | null
    pageId: string | null
    catalogCardId: string | null
  }

  export type SlotMaxAggregateOutputType = {
    id: string | null
    row: number | null
    col: number | null
    pageId: string | null
    catalogCardId: string | null
  }

  export type SlotCountAggregateOutputType = {
    id: number
    row: number
    col: number
    pageId: number
    catalogCardId: number
    _all: number
  }


  export type SlotAvgAggregateInputType = {
    row?: true
    col?: true
  }

  export type SlotSumAggregateInputType = {
    row?: true
    col?: true
  }

  export type SlotMinAggregateInputType = {
    id?: true
    row?: true
    col?: true
    pageId?: true
    catalogCardId?: true
  }

  export type SlotMaxAggregateInputType = {
    id?: true
    row?: true
    col?: true
    pageId?: true
    catalogCardId?: true
  }

  export type SlotCountAggregateInputType = {
    id?: true
    row?: true
    col?: true
    pageId?: true
    catalogCardId?: true
    _all?: true
  }

  export type SlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slot to aggregate.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Slots
    **/
    _count?: true | SlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SlotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SlotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlotMaxAggregateInputType
  }

  export type GetSlotAggregateType<T extends SlotAggregateArgs> = {
        [P in keyof T & keyof AggregateSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlot[P]>
      : GetScalarType<T[P], AggregateSlot[P]>
  }




  export type SlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithAggregationInput | SlotOrderByWithAggregationInput[]
    by: SlotScalarFieldEnum[] | SlotScalarFieldEnum
    having?: SlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlotCountAggregateInputType | true
    _avg?: SlotAvgAggregateInputType
    _sum?: SlotSumAggregateInputType
    _min?: SlotMinAggregateInputType
    _max?: SlotMaxAggregateInputType
  }

  export type SlotGroupByOutputType = {
    id: string
    row: number
    col: number
    pageId: string
    catalogCardId: string | null
    _count: SlotCountAggregateOutputType | null
    _avg: SlotAvgAggregateOutputType | null
    _sum: SlotSumAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  type GetSlotGroupByPayload<T extends SlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlotGroupByOutputType[P]>
            : GetScalarType<T[P], SlotGroupByOutputType[P]>
        }
      >
    >


  export type SlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    row?: boolean
    col?: boolean
    pageId?: boolean
    catalogCardId?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    row?: boolean
    col?: boolean
    pageId?: boolean
    catalogCardId?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    row?: boolean
    col?: boolean
    pageId?: boolean
    catalogCardId?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectScalar = {
    id?: boolean
    row?: boolean
    col?: boolean
    pageId?: boolean
    catalogCardId?: boolean
  }

  export type SlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "row" | "col" | "pageId" | "catalogCardId", ExtArgs["result"]["slot"]>
  export type SlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }
  export type SlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }
  export type SlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
    catalogCard?: boolean | Slot$catalogCardArgs<ExtArgs>
  }

  export type $SlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Slot"
    objects: {
      page: Prisma.$PagePayload<ExtArgs>
      catalogCard: Prisma.$CatalogCardPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      row: number
      col: number
      pageId: string
      catalogCardId: string | null
    }, ExtArgs["result"]["slot"]>
    composites: {}
  }

  type SlotGetPayload<S extends boolean | null | undefined | SlotDefaultArgs> = $Result.GetResult<Prisma.$SlotPayload, S>

  type SlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SlotCountAggregateInputType | true
    }

  export interface SlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Slot'], meta: { name: 'Slot' } }
    /**
     * Find zero or one Slot that matches the filter.
     * @param {SlotFindUniqueArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlotFindUniqueArgs>(args: SelectSubset<T, SlotFindUniqueArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SlotFindUniqueOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlotFindUniqueOrThrowArgs>(args: SelectSubset<T, SlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlotFindFirstArgs>(args?: SelectSubset<T, SlotFindFirstArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlotFindFirstOrThrowArgs>(args?: SelectSubset<T, SlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slots
     * const slots = await prisma.slot.findMany()
     * 
     * // Get first 10 Slots
     * const slots = await prisma.slot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slotWithIdOnly = await prisma.slot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SlotFindManyArgs>(args?: SelectSubset<T, SlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slot.
     * @param {SlotCreateArgs} args - Arguments to create a Slot.
     * @example
     * // Create one Slot
     * const Slot = await prisma.slot.create({
     *   data: {
     *     // ... data to create a Slot
     *   }
     * })
     * 
     */
    create<T extends SlotCreateArgs>(args: SelectSubset<T, SlotCreateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Slots.
     * @param {SlotCreateManyArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SlotCreateManyArgs>(args?: SelectSubset<T, SlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slots and returns the data saved in the database.
     * @param {SlotCreateManyAndReturnArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SlotCreateManyAndReturnArgs>(args?: SelectSubset<T, SlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Slot.
     * @param {SlotDeleteArgs} args - Arguments to delete one Slot.
     * @example
     * // Delete one Slot
     * const Slot = await prisma.slot.delete({
     *   where: {
     *     // ... filter to delete one Slot
     *   }
     * })
     * 
     */
    delete<T extends SlotDeleteArgs>(args: SelectSubset<T, SlotDeleteArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slot.
     * @param {SlotUpdateArgs} args - Arguments to update one Slot.
     * @example
     * // Update one Slot
     * const slot = await prisma.slot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SlotUpdateArgs>(args: SelectSubset<T, SlotUpdateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Slots.
     * @param {SlotDeleteManyArgs} args - Arguments to filter Slots to delete.
     * @example
     * // Delete a few Slots
     * const { count } = await prisma.slot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SlotDeleteManyArgs>(args?: SelectSubset<T, SlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SlotUpdateManyArgs>(args: SelectSubset<T, SlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots and returns the data updated in the database.
     * @param {SlotUpdateManyAndReturnArgs} args - Arguments to update many Slots.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SlotUpdateManyAndReturnArgs>(args: SelectSubset<T, SlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Slot.
     * @param {SlotUpsertArgs} args - Arguments to update or create a Slot.
     * @example
     * // Update or create a Slot
     * const slot = await prisma.slot.upsert({
     *   create: {
     *     // ... data to create a Slot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot we want to update
     *   }
     * })
     */
    upsert<T extends SlotUpsertArgs>(args: SelectSubset<T, SlotUpsertArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotCountArgs} args - Arguments to filter Slots to count.
     * @example
     * // Count the number of Slots
     * const count = await prisma.slot.count({
     *   where: {
     *     // ... the filter for the Slots we want to count
     *   }
     * })
    **/
    count<T extends SlotCountArgs>(
      args?: Subset<T, SlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlotAggregateArgs>(args: Subset<T, SlotAggregateArgs>): Prisma.PrismaPromise<GetSlotAggregateType<T>>

    /**
     * Group by Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SlotGroupByArgs['orderBy'] }
        : { orderBy?: SlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Slot model
   */
  readonly fields: SlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Slot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    page<T extends PageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PageDefaultArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    catalogCard<T extends Slot$catalogCardArgs<ExtArgs> = {}>(args?: Subset<T, Slot$catalogCardArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Slot model
   */
  interface SlotFieldRefs {
    readonly id: FieldRef<"Slot", 'String'>
    readonly row: FieldRef<"Slot", 'Int'>
    readonly col: FieldRef<"Slot", 'Int'>
    readonly pageId: FieldRef<"Slot", 'String'>
    readonly catalogCardId: FieldRef<"Slot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Slot findUnique
   */
  export type SlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findUniqueOrThrow
   */
  export type SlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findFirst
   */
  export type SlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findFirstOrThrow
   */
  export type SlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findMany
   */
  export type SlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slots to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot create
   */
  export type SlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The data needed to create a Slot.
     */
    data: XOR<SlotCreateInput, SlotUncheckedCreateInput>
  }

  /**
   * Slot createMany
   */
  export type SlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Slot createManyAndReturn
   */
  export type SlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Slot update
   */
  export type SlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The data needed to update a Slot.
     */
    data: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
    /**
     * Choose, which Slot to update.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot updateMany
   */
  export type SlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Slots.
     */
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyInput>
    /**
     * Filter which Slots to update
     */
    where?: SlotWhereInput
    /**
     * Limit how many Slots to update.
     */
    limit?: number
  }

  /**
   * Slot updateManyAndReturn
   */
  export type SlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * The data used to update Slots.
     */
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyInput>
    /**
     * Filter which Slots to update
     */
    where?: SlotWhereInput
    /**
     * Limit how many Slots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Slot upsert
   */
  export type SlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The filter to search for the Slot to update in case it exists.
     */
    where: SlotWhereUniqueInput
    /**
     * In case the Slot found by the `where` argument doesn't exist, create a new Slot with this data.
     */
    create: XOR<SlotCreateInput, SlotUncheckedCreateInput>
    /**
     * In case the Slot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
  }

  /**
   * Slot delete
   */
  export type SlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter which Slot to delete.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot deleteMany
   */
  export type SlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slots to delete
     */
    where?: SlotWhereInput
    /**
     * Limit how many Slots to delete.
     */
    limit?: number
  }

  /**
   * Slot.catalogCard
   */
  export type Slot$catalogCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    where?: CatalogCardWhereInput
  }

  /**
   * Slot without action
   */
  export type SlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
  }


  /**
   * Model CatalogCard
   */

  export type AggregateCatalogCard = {
    _count: CatalogCardCountAggregateOutputType | null
    _min: CatalogCardMinAggregateOutputType | null
    _max: CatalogCardMaxAggregateOutputType | null
  }

  export type CatalogCardMinAggregateOutputType = {
    id: string | null
    externalId: string | null
    name: string | null
    number: string | null
    setName: string | null
    setId: string | null
    imageSmall: string | null
    imageLarge: string | null
    rarity: string | null
    cachedAt: Date | null
  }

  export type CatalogCardMaxAggregateOutputType = {
    id: string | null
    externalId: string | null
    name: string | null
    number: string | null
    setName: string | null
    setId: string | null
    imageSmall: string | null
    imageLarge: string | null
    rarity: string | null
    cachedAt: Date | null
  }

  export type CatalogCardCountAggregateOutputType = {
    id: number
    externalId: number
    name: number
    number: number
    setName: number
    setId: number
    imageSmall: number
    imageLarge: number
    rarity: number
    cachedAt: number
    _all: number
  }


  export type CatalogCardMinAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    number?: true
    setName?: true
    setId?: true
    imageSmall?: true
    imageLarge?: true
    rarity?: true
    cachedAt?: true
  }

  export type CatalogCardMaxAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    number?: true
    setName?: true
    setId?: true
    imageSmall?: true
    imageLarge?: true
    rarity?: true
    cachedAt?: true
  }

  export type CatalogCardCountAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    number?: true
    setName?: true
    setId?: true
    imageSmall?: true
    imageLarge?: true
    rarity?: true
    cachedAt?: true
    _all?: true
  }

  export type CatalogCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogCard to aggregate.
     */
    where?: CatalogCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogCards to fetch.
     */
    orderBy?: CatalogCardOrderByWithRelationInput | CatalogCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CatalogCards
    **/
    _count?: true | CatalogCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogCardMaxAggregateInputType
  }

  export type GetCatalogCardAggregateType<T extends CatalogCardAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalogCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalogCard[P]>
      : GetScalarType<T[P], AggregateCatalogCard[P]>
  }




  export type CatalogCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogCardWhereInput
    orderBy?: CatalogCardOrderByWithAggregationInput | CatalogCardOrderByWithAggregationInput[]
    by: CatalogCardScalarFieldEnum[] | CatalogCardScalarFieldEnum
    having?: CatalogCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogCardCountAggregateInputType | true
    _min?: CatalogCardMinAggregateInputType
    _max?: CatalogCardMaxAggregateInputType
  }

  export type CatalogCardGroupByOutputType = {
    id: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity: string | null
    cachedAt: Date
    _count: CatalogCardCountAggregateOutputType | null
    _min: CatalogCardMinAggregateOutputType | null
    _max: CatalogCardMaxAggregateOutputType | null
  }

  type GetCatalogCardGroupByPayload<T extends CatalogCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogCardGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogCardGroupByOutputType[P]>
        }
      >
    >


  export type CatalogCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    number?: boolean
    setName?: boolean
    setId?: boolean
    imageSmall?: boolean
    imageLarge?: boolean
    rarity?: boolean
    cachedAt?: boolean
    slots?: boolean | CatalogCard$slotsArgs<ExtArgs>
    _count?: boolean | CatalogCardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalogCard"]>

  export type CatalogCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    number?: boolean
    setName?: boolean
    setId?: boolean
    imageSmall?: boolean
    imageLarge?: boolean
    rarity?: boolean
    cachedAt?: boolean
  }, ExtArgs["result"]["catalogCard"]>

  export type CatalogCardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    number?: boolean
    setName?: boolean
    setId?: boolean
    imageSmall?: boolean
    imageLarge?: boolean
    rarity?: boolean
    cachedAt?: boolean
  }, ExtArgs["result"]["catalogCard"]>

  export type CatalogCardSelectScalar = {
    id?: boolean
    externalId?: boolean
    name?: boolean
    number?: boolean
    setName?: boolean
    setId?: boolean
    imageSmall?: boolean
    imageLarge?: boolean
    rarity?: boolean
    cachedAt?: boolean
  }

  export type CatalogCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "name" | "number" | "setName" | "setId" | "imageSmall" | "imageLarge" | "rarity" | "cachedAt", ExtArgs["result"]["catalogCard"]>
  export type CatalogCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | CatalogCard$slotsArgs<ExtArgs>
    _count?: boolean | CatalogCardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CatalogCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CatalogCardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CatalogCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CatalogCard"
    objects: {
      slots: Prisma.$SlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: string
      name: string
      number: string
      setName: string
      setId: string
      imageSmall: string
      imageLarge: string
      rarity: string | null
      cachedAt: Date
    }, ExtArgs["result"]["catalogCard"]>
    composites: {}
  }

  type CatalogCardGetPayload<S extends boolean | null | undefined | CatalogCardDefaultArgs> = $Result.GetResult<Prisma.$CatalogCardPayload, S>

  type CatalogCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatalogCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatalogCardCountAggregateInputType | true
    }

  export interface CatalogCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CatalogCard'], meta: { name: 'CatalogCard' } }
    /**
     * Find zero or one CatalogCard that matches the filter.
     * @param {CatalogCardFindUniqueArgs} args - Arguments to find a CatalogCard
     * @example
     * // Get one CatalogCard
     * const catalogCard = await prisma.catalogCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogCardFindUniqueArgs>(args: SelectSubset<T, CatalogCardFindUniqueArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CatalogCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatalogCardFindUniqueOrThrowArgs} args - Arguments to find a CatalogCard
     * @example
     * // Get one CatalogCard
     * const catalogCard = await prisma.catalogCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogCardFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardFindFirstArgs} args - Arguments to find a CatalogCard
     * @example
     * // Get one CatalogCard
     * const catalogCard = await prisma.catalogCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogCardFindFirstArgs>(args?: SelectSubset<T, CatalogCardFindFirstArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardFindFirstOrThrowArgs} args - Arguments to find a CatalogCard
     * @example
     * // Get one CatalogCard
     * const catalogCard = await prisma.catalogCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogCardFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CatalogCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CatalogCards
     * const catalogCards = await prisma.catalogCard.findMany()
     * 
     * // Get first 10 CatalogCards
     * const catalogCards = await prisma.catalogCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogCardWithIdOnly = await prisma.catalogCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogCardFindManyArgs>(args?: SelectSubset<T, CatalogCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CatalogCard.
     * @param {CatalogCardCreateArgs} args - Arguments to create a CatalogCard.
     * @example
     * // Create one CatalogCard
     * const CatalogCard = await prisma.catalogCard.create({
     *   data: {
     *     // ... data to create a CatalogCard
     *   }
     * })
     * 
     */
    create<T extends CatalogCardCreateArgs>(args: SelectSubset<T, CatalogCardCreateArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CatalogCards.
     * @param {CatalogCardCreateManyArgs} args - Arguments to create many CatalogCards.
     * @example
     * // Create many CatalogCards
     * const catalogCard = await prisma.catalogCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogCardCreateManyArgs>(args?: SelectSubset<T, CatalogCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CatalogCards and returns the data saved in the database.
     * @param {CatalogCardCreateManyAndReturnArgs} args - Arguments to create many CatalogCards.
     * @example
     * // Create many CatalogCards
     * const catalogCard = await prisma.catalogCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CatalogCards and only return the `id`
     * const catalogCardWithIdOnly = await prisma.catalogCard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatalogCardCreateManyAndReturnArgs>(args?: SelectSubset<T, CatalogCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CatalogCard.
     * @param {CatalogCardDeleteArgs} args - Arguments to delete one CatalogCard.
     * @example
     * // Delete one CatalogCard
     * const CatalogCard = await prisma.catalogCard.delete({
     *   where: {
     *     // ... filter to delete one CatalogCard
     *   }
     * })
     * 
     */
    delete<T extends CatalogCardDeleteArgs>(args: SelectSubset<T, CatalogCardDeleteArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CatalogCard.
     * @param {CatalogCardUpdateArgs} args - Arguments to update one CatalogCard.
     * @example
     * // Update one CatalogCard
     * const catalogCard = await prisma.catalogCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogCardUpdateArgs>(args: SelectSubset<T, CatalogCardUpdateArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CatalogCards.
     * @param {CatalogCardDeleteManyArgs} args - Arguments to filter CatalogCards to delete.
     * @example
     * // Delete a few CatalogCards
     * const { count } = await prisma.catalogCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogCardDeleteManyArgs>(args?: SelectSubset<T, CatalogCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CatalogCards
     * const catalogCard = await prisma.catalogCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogCardUpdateManyArgs>(args: SelectSubset<T, CatalogCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogCards and returns the data updated in the database.
     * @param {CatalogCardUpdateManyAndReturnArgs} args - Arguments to update many CatalogCards.
     * @example
     * // Update many CatalogCards
     * const catalogCard = await prisma.catalogCard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CatalogCards and only return the `id`
     * const catalogCardWithIdOnly = await prisma.catalogCard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CatalogCardUpdateManyAndReturnArgs>(args: SelectSubset<T, CatalogCardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CatalogCard.
     * @param {CatalogCardUpsertArgs} args - Arguments to update or create a CatalogCard.
     * @example
     * // Update or create a CatalogCard
     * const catalogCard = await prisma.catalogCard.upsert({
     *   create: {
     *     // ... data to create a CatalogCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CatalogCard we want to update
     *   }
     * })
     */
    upsert<T extends CatalogCardUpsertArgs>(args: SelectSubset<T, CatalogCardUpsertArgs<ExtArgs>>): Prisma__CatalogCardClient<$Result.GetResult<Prisma.$CatalogCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CatalogCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardCountArgs} args - Arguments to filter CatalogCards to count.
     * @example
     * // Count the number of CatalogCards
     * const count = await prisma.catalogCard.count({
     *   where: {
     *     // ... the filter for the CatalogCards we want to count
     *   }
     * })
    **/
    count<T extends CatalogCardCountArgs>(
      args?: Subset<T, CatalogCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CatalogCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CatalogCardAggregateArgs>(args: Subset<T, CatalogCardAggregateArgs>): Prisma.PrismaPromise<GetCatalogCardAggregateType<T>>

    /**
     * Group by CatalogCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CatalogCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogCardGroupByArgs['orderBy'] }
        : { orderBy?: CatalogCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CatalogCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CatalogCard model
   */
  readonly fields: CatalogCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CatalogCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slots<T extends CatalogCard$slotsArgs<ExtArgs> = {}>(args?: Subset<T, CatalogCard$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CatalogCard model
   */
  interface CatalogCardFieldRefs {
    readonly id: FieldRef<"CatalogCard", 'String'>
    readonly externalId: FieldRef<"CatalogCard", 'String'>
    readonly name: FieldRef<"CatalogCard", 'String'>
    readonly number: FieldRef<"CatalogCard", 'String'>
    readonly setName: FieldRef<"CatalogCard", 'String'>
    readonly setId: FieldRef<"CatalogCard", 'String'>
    readonly imageSmall: FieldRef<"CatalogCard", 'String'>
    readonly imageLarge: FieldRef<"CatalogCard", 'String'>
    readonly rarity: FieldRef<"CatalogCard", 'String'>
    readonly cachedAt: FieldRef<"CatalogCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CatalogCard findUnique
   */
  export type CatalogCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter, which CatalogCard to fetch.
     */
    where: CatalogCardWhereUniqueInput
  }

  /**
   * CatalogCard findUniqueOrThrow
   */
  export type CatalogCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter, which CatalogCard to fetch.
     */
    where: CatalogCardWhereUniqueInput
  }

  /**
   * CatalogCard findFirst
   */
  export type CatalogCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter, which CatalogCard to fetch.
     */
    where?: CatalogCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogCards to fetch.
     */
    orderBy?: CatalogCardOrderByWithRelationInput | CatalogCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogCards.
     */
    cursor?: CatalogCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogCards.
     */
    distinct?: CatalogCardScalarFieldEnum | CatalogCardScalarFieldEnum[]
  }

  /**
   * CatalogCard findFirstOrThrow
   */
  export type CatalogCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter, which CatalogCard to fetch.
     */
    where?: CatalogCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogCards to fetch.
     */
    orderBy?: CatalogCardOrderByWithRelationInput | CatalogCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogCards.
     */
    cursor?: CatalogCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogCards.
     */
    distinct?: CatalogCardScalarFieldEnum | CatalogCardScalarFieldEnum[]
  }

  /**
   * CatalogCard findMany
   */
  export type CatalogCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter, which CatalogCards to fetch.
     */
    where?: CatalogCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogCards to fetch.
     */
    orderBy?: CatalogCardOrderByWithRelationInput | CatalogCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CatalogCards.
     */
    cursor?: CatalogCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogCards.
     */
    skip?: number
    distinct?: CatalogCardScalarFieldEnum | CatalogCardScalarFieldEnum[]
  }

  /**
   * CatalogCard create
   */
  export type CatalogCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * The data needed to create a CatalogCard.
     */
    data: XOR<CatalogCardCreateInput, CatalogCardUncheckedCreateInput>
  }

  /**
   * CatalogCard createMany
   */
  export type CatalogCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CatalogCards.
     */
    data: CatalogCardCreateManyInput | CatalogCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CatalogCard createManyAndReturn
   */
  export type CatalogCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * The data used to create many CatalogCards.
     */
    data: CatalogCardCreateManyInput | CatalogCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CatalogCard update
   */
  export type CatalogCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * The data needed to update a CatalogCard.
     */
    data: XOR<CatalogCardUpdateInput, CatalogCardUncheckedUpdateInput>
    /**
     * Choose, which CatalogCard to update.
     */
    where: CatalogCardWhereUniqueInput
  }

  /**
   * CatalogCard updateMany
   */
  export type CatalogCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CatalogCards.
     */
    data: XOR<CatalogCardUpdateManyMutationInput, CatalogCardUncheckedUpdateManyInput>
    /**
     * Filter which CatalogCards to update
     */
    where?: CatalogCardWhereInput
    /**
     * Limit how many CatalogCards to update.
     */
    limit?: number
  }

  /**
   * CatalogCard updateManyAndReturn
   */
  export type CatalogCardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * The data used to update CatalogCards.
     */
    data: XOR<CatalogCardUpdateManyMutationInput, CatalogCardUncheckedUpdateManyInput>
    /**
     * Filter which CatalogCards to update
     */
    where?: CatalogCardWhereInput
    /**
     * Limit how many CatalogCards to update.
     */
    limit?: number
  }

  /**
   * CatalogCard upsert
   */
  export type CatalogCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * The filter to search for the CatalogCard to update in case it exists.
     */
    where: CatalogCardWhereUniqueInput
    /**
     * In case the CatalogCard found by the `where` argument doesn't exist, create a new CatalogCard with this data.
     */
    create: XOR<CatalogCardCreateInput, CatalogCardUncheckedCreateInput>
    /**
     * In case the CatalogCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogCardUpdateInput, CatalogCardUncheckedUpdateInput>
  }

  /**
   * CatalogCard delete
   */
  export type CatalogCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
    /**
     * Filter which CatalogCard to delete.
     */
    where: CatalogCardWhereUniqueInput
  }

  /**
   * CatalogCard deleteMany
   */
  export type CatalogCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogCards to delete
     */
    where?: CatalogCardWhereInput
    /**
     * Limit how many CatalogCards to delete.
     */
    limit?: number
  }

  /**
   * CatalogCard.slots
   */
  export type CatalogCard$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slot
     */
    omit?: SlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    cursor?: SlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * CatalogCard without action
   */
  export type CatalogCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCard
     */
    select?: CatalogCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogCard
     */
    omit?: CatalogCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogCardInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BinderScalarFieldEnum: {
    id: 'id',
    nickname: 'nickname',
    color: 'color',
    layoutRows: 'layoutRows',
    layoutCols: 'layoutCols',
    lastViewedPage: 'lastViewedPage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BinderScalarFieldEnum = (typeof BinderScalarFieldEnum)[keyof typeof BinderScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    pageIndex: 'pageIndex',
    binderId: 'binderId'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const SlotScalarFieldEnum: {
    id: 'id',
    row: 'row',
    col: 'col',
    pageId: 'pageId',
    catalogCardId: 'catalogCardId'
  };

  export type SlotScalarFieldEnum = (typeof SlotScalarFieldEnum)[keyof typeof SlotScalarFieldEnum]


  export const CatalogCardScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    name: 'name',
    number: 'number',
    setName: 'setName',
    setId: 'setId',
    imageSmall: 'imageSmall',
    imageLarge: 'imageLarge',
    rarity: 'rarity',
    cachedAt: 'cachedAt'
  };

  export type CatalogCardScalarFieldEnum = (typeof CatalogCardScalarFieldEnum)[keyof typeof CatalogCardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BinderWhereInput = {
    AND?: BinderWhereInput | BinderWhereInput[]
    OR?: BinderWhereInput[]
    NOT?: BinderWhereInput | BinderWhereInput[]
    id?: StringFilter<"Binder"> | string
    nickname?: StringFilter<"Binder"> | string
    color?: StringFilter<"Binder"> | string
    layoutRows?: IntFilter<"Binder"> | number
    layoutCols?: IntFilter<"Binder"> | number
    lastViewedPage?: IntFilter<"Binder"> | number
    createdAt?: DateTimeFilter<"Binder"> | Date | string
    updatedAt?: DateTimeFilter<"Binder"> | Date | string
    pages?: PageListRelationFilter
  }

  export type BinderOrderByWithRelationInput = {
    id?: SortOrder
    nickname?: SortOrder
    color?: SortOrder
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pages?: PageOrderByRelationAggregateInput
  }

  export type BinderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BinderWhereInput | BinderWhereInput[]
    OR?: BinderWhereInput[]
    NOT?: BinderWhereInput | BinderWhereInput[]
    nickname?: StringFilter<"Binder"> | string
    color?: StringFilter<"Binder"> | string
    layoutRows?: IntFilter<"Binder"> | number
    layoutCols?: IntFilter<"Binder"> | number
    lastViewedPage?: IntFilter<"Binder"> | number
    createdAt?: DateTimeFilter<"Binder"> | Date | string
    updatedAt?: DateTimeFilter<"Binder"> | Date | string
    pages?: PageListRelationFilter
  }, "id">

  export type BinderOrderByWithAggregationInput = {
    id?: SortOrder
    nickname?: SortOrder
    color?: SortOrder
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BinderCountOrderByAggregateInput
    _avg?: BinderAvgOrderByAggregateInput
    _max?: BinderMaxOrderByAggregateInput
    _min?: BinderMinOrderByAggregateInput
    _sum?: BinderSumOrderByAggregateInput
  }

  export type BinderScalarWhereWithAggregatesInput = {
    AND?: BinderScalarWhereWithAggregatesInput | BinderScalarWhereWithAggregatesInput[]
    OR?: BinderScalarWhereWithAggregatesInput[]
    NOT?: BinderScalarWhereWithAggregatesInput | BinderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Binder"> | string
    nickname?: StringWithAggregatesFilter<"Binder"> | string
    color?: StringWithAggregatesFilter<"Binder"> | string
    layoutRows?: IntWithAggregatesFilter<"Binder"> | number
    layoutCols?: IntWithAggregatesFilter<"Binder"> | number
    lastViewedPage?: IntWithAggregatesFilter<"Binder"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Binder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Binder"> | Date | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: StringFilter<"Page"> | string
    pageIndex?: IntFilter<"Page"> | number
    binderId?: StringFilter<"Page"> | string
    binder?: XOR<BinderScalarRelationFilter, BinderWhereInput>
    slots?: SlotListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    pageIndex?: SortOrder
    binderId?: SortOrder
    binder?: BinderOrderByWithRelationInput
    slots?: SlotOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    binderId_pageIndex?: PageBinderIdPageIndexCompoundUniqueInput
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    pageIndex?: IntFilter<"Page"> | number
    binderId?: StringFilter<"Page"> | string
    binder?: XOR<BinderScalarRelationFilter, BinderWhereInput>
    slots?: SlotListRelationFilter
  }, "id" | "binderId_pageIndex">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    pageIndex?: SortOrder
    binderId?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _avg?: PageAvgOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
    _sum?: PageSumOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Page"> | string
    pageIndex?: IntWithAggregatesFilter<"Page"> | number
    binderId?: StringWithAggregatesFilter<"Page"> | string
  }

  export type SlotWhereInput = {
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    id?: StringFilter<"Slot"> | string
    row?: IntFilter<"Slot"> | number
    col?: IntFilter<"Slot"> | number
    pageId?: StringFilter<"Slot"> | string
    catalogCardId?: StringNullableFilter<"Slot"> | string | null
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
    catalogCard?: XOR<CatalogCardNullableScalarRelationFilter, CatalogCardWhereInput> | null
  }

  export type SlotOrderByWithRelationInput = {
    id?: SortOrder
    row?: SortOrder
    col?: SortOrder
    pageId?: SortOrder
    catalogCardId?: SortOrderInput | SortOrder
    page?: PageOrderByWithRelationInput
    catalogCard?: CatalogCardOrderByWithRelationInput
  }

  export type SlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pageId_row_col?: SlotPageIdRowColCompoundUniqueInput
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    row?: IntFilter<"Slot"> | number
    col?: IntFilter<"Slot"> | number
    pageId?: StringFilter<"Slot"> | string
    catalogCardId?: StringNullableFilter<"Slot"> | string | null
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
    catalogCard?: XOR<CatalogCardNullableScalarRelationFilter, CatalogCardWhereInput> | null
  }, "id" | "pageId_row_col">

  export type SlotOrderByWithAggregationInput = {
    id?: SortOrder
    row?: SortOrder
    col?: SortOrder
    pageId?: SortOrder
    catalogCardId?: SortOrderInput | SortOrder
    _count?: SlotCountOrderByAggregateInput
    _avg?: SlotAvgOrderByAggregateInput
    _max?: SlotMaxOrderByAggregateInput
    _min?: SlotMinOrderByAggregateInput
    _sum?: SlotSumOrderByAggregateInput
  }

  export type SlotScalarWhereWithAggregatesInput = {
    AND?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    OR?: SlotScalarWhereWithAggregatesInput[]
    NOT?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Slot"> | string
    row?: IntWithAggregatesFilter<"Slot"> | number
    col?: IntWithAggregatesFilter<"Slot"> | number
    pageId?: StringWithAggregatesFilter<"Slot"> | string
    catalogCardId?: StringNullableWithAggregatesFilter<"Slot"> | string | null
  }

  export type CatalogCardWhereInput = {
    AND?: CatalogCardWhereInput | CatalogCardWhereInput[]
    OR?: CatalogCardWhereInput[]
    NOT?: CatalogCardWhereInput | CatalogCardWhereInput[]
    id?: StringFilter<"CatalogCard"> | string
    externalId?: StringFilter<"CatalogCard"> | string
    name?: StringFilter<"CatalogCard"> | string
    number?: StringFilter<"CatalogCard"> | string
    setName?: StringFilter<"CatalogCard"> | string
    setId?: StringFilter<"CatalogCard"> | string
    imageSmall?: StringFilter<"CatalogCard"> | string
    imageLarge?: StringFilter<"CatalogCard"> | string
    rarity?: StringNullableFilter<"CatalogCard"> | string | null
    cachedAt?: DateTimeFilter<"CatalogCard"> | Date | string
    slots?: SlotListRelationFilter
  }

  export type CatalogCardOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    setName?: SortOrder
    setId?: SortOrder
    imageSmall?: SortOrder
    imageLarge?: SortOrder
    rarity?: SortOrderInput | SortOrder
    cachedAt?: SortOrder
    slots?: SlotOrderByRelationAggregateInput
  }

  export type CatalogCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    AND?: CatalogCardWhereInput | CatalogCardWhereInput[]
    OR?: CatalogCardWhereInput[]
    NOT?: CatalogCardWhereInput | CatalogCardWhereInput[]
    name?: StringFilter<"CatalogCard"> | string
    number?: StringFilter<"CatalogCard"> | string
    setName?: StringFilter<"CatalogCard"> | string
    setId?: StringFilter<"CatalogCard"> | string
    imageSmall?: StringFilter<"CatalogCard"> | string
    imageLarge?: StringFilter<"CatalogCard"> | string
    rarity?: StringNullableFilter<"CatalogCard"> | string | null
    cachedAt?: DateTimeFilter<"CatalogCard"> | Date | string
    slots?: SlotListRelationFilter
  }, "id" | "externalId">

  export type CatalogCardOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    setName?: SortOrder
    setId?: SortOrder
    imageSmall?: SortOrder
    imageLarge?: SortOrder
    rarity?: SortOrderInput | SortOrder
    cachedAt?: SortOrder
    _count?: CatalogCardCountOrderByAggregateInput
    _max?: CatalogCardMaxOrderByAggregateInput
    _min?: CatalogCardMinOrderByAggregateInput
  }

  export type CatalogCardScalarWhereWithAggregatesInput = {
    AND?: CatalogCardScalarWhereWithAggregatesInput | CatalogCardScalarWhereWithAggregatesInput[]
    OR?: CatalogCardScalarWhereWithAggregatesInput[]
    NOT?: CatalogCardScalarWhereWithAggregatesInput | CatalogCardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CatalogCard"> | string
    externalId?: StringWithAggregatesFilter<"CatalogCard"> | string
    name?: StringWithAggregatesFilter<"CatalogCard"> | string
    number?: StringWithAggregatesFilter<"CatalogCard"> | string
    setName?: StringWithAggregatesFilter<"CatalogCard"> | string
    setId?: StringWithAggregatesFilter<"CatalogCard"> | string
    imageSmall?: StringWithAggregatesFilter<"CatalogCard"> | string
    imageLarge?: StringWithAggregatesFilter<"CatalogCard"> | string
    rarity?: StringNullableWithAggregatesFilter<"CatalogCard"> | string | null
    cachedAt?: DateTimeWithAggregatesFilter<"CatalogCard"> | Date | string
  }

  export type BinderCreateInput = {
    id?: string
    nickname: string
    color?: string
    layoutRows: number
    layoutCols: number
    lastViewedPage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBinderInput
  }

  export type BinderUncheckedCreateInput = {
    id?: string
    nickname: string
    color?: string
    layoutRows: number
    layoutCols: number
    lastViewedPage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBinderInput
  }

  export type BinderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBinderNestedInput
  }

  export type BinderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBinderNestedInput
  }

  export type BinderCreateManyInput = {
    id?: string
    nickname: string
    color?: string
    layoutRows: number
    layoutCols: number
    lastViewedPage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    id?: string
    pageIndex: number
    binder: BinderCreateNestedOneWithoutPagesInput
    slots?: SlotCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    pageIndex: number
    binderId: string
    slots?: SlotUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    binder?: BinderUpdateOneRequiredWithoutPagesNestedInput
    slots?: SlotUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    binderId?: StringFieldUpdateOperationsInput | string
    slots?: SlotUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: string
    pageIndex: number
    binderId: string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    binderId?: StringFieldUpdateOperationsInput | string
  }

  export type SlotCreateInput = {
    id?: string
    row: number
    col: number
    page: PageCreateNestedOneWithoutSlotsInput
    catalogCard?: CatalogCardCreateNestedOneWithoutSlotsInput
  }

  export type SlotUncheckedCreateInput = {
    id?: string
    row: number
    col: number
    pageId: string
    catalogCardId?: string | null
  }

  export type SlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    page?: PageUpdateOneRequiredWithoutSlotsNestedInput
    catalogCard?: CatalogCardUpdateOneWithoutSlotsNestedInput
  }

  export type SlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    pageId?: StringFieldUpdateOperationsInput | string
    catalogCardId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SlotCreateManyInput = {
    id?: string
    row: number
    col: number
    pageId: string
    catalogCardId?: string | null
  }

  export type SlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
  }

  export type SlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    pageId?: StringFieldUpdateOperationsInput | string
    catalogCardId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CatalogCardCreateInput = {
    id?: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity?: string | null
    cachedAt?: Date | string
    slots?: SlotCreateNestedManyWithoutCatalogCardInput
  }

  export type CatalogCardUncheckedCreateInput = {
    id?: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity?: string | null
    cachedAt?: Date | string
    slots?: SlotUncheckedCreateNestedManyWithoutCatalogCardInput
  }

  export type CatalogCardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUpdateManyWithoutCatalogCardNestedInput
  }

  export type CatalogCardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUncheckedUpdateManyWithoutCatalogCardNestedInput
  }

  export type CatalogCardCreateManyInput = {
    id?: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity?: string | null
    cachedAt?: Date | string
  }

  export type CatalogCardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogCardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BinderCountOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    color?: SortOrder
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinderAvgOrderByAggregateInput = {
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
  }

  export type BinderMaxOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    color?: SortOrder
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinderMinOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    color?: SortOrder
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinderSumOrderByAggregateInput = {
    layoutRows?: SortOrder
    layoutCols?: SortOrder
    lastViewedPage?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BinderScalarRelationFilter = {
    is?: BinderWhereInput
    isNot?: BinderWhereInput
  }

  export type SlotListRelationFilter = {
    every?: SlotWhereInput
    some?: SlotWhereInput
    none?: SlotWhereInput
  }

  export type SlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageBinderIdPageIndexCompoundUniqueInput = {
    binderId: string
    pageIndex: number
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    pageIndex?: SortOrder
    binderId?: SortOrder
  }

  export type PageAvgOrderByAggregateInput = {
    pageIndex?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    pageIndex?: SortOrder
    binderId?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    pageIndex?: SortOrder
    binderId?: SortOrder
  }

  export type PageSumOrderByAggregateInput = {
    pageIndex?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PageScalarRelationFilter = {
    is?: PageWhereInput
    isNot?: PageWhereInput
  }

  export type CatalogCardNullableScalarRelationFilter = {
    is?: CatalogCardWhereInput | null
    isNot?: CatalogCardWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SlotPageIdRowColCompoundUniqueInput = {
    pageId: string
    row: number
    col: number
  }

  export type SlotCountOrderByAggregateInput = {
    id?: SortOrder
    row?: SortOrder
    col?: SortOrder
    pageId?: SortOrder
    catalogCardId?: SortOrder
  }

  export type SlotAvgOrderByAggregateInput = {
    row?: SortOrder
    col?: SortOrder
  }

  export type SlotMaxOrderByAggregateInput = {
    id?: SortOrder
    row?: SortOrder
    col?: SortOrder
    pageId?: SortOrder
    catalogCardId?: SortOrder
  }

  export type SlotMinOrderByAggregateInput = {
    id?: SortOrder
    row?: SortOrder
    col?: SortOrder
    pageId?: SortOrder
    catalogCardId?: SortOrder
  }

  export type SlotSumOrderByAggregateInput = {
    row?: SortOrder
    col?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CatalogCardCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    setName?: SortOrder
    setId?: SortOrder
    imageSmall?: SortOrder
    imageLarge?: SortOrder
    rarity?: SortOrder
    cachedAt?: SortOrder
  }

  export type CatalogCardMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    setName?: SortOrder
    setId?: SortOrder
    imageSmall?: SortOrder
    imageLarge?: SortOrder
    rarity?: SortOrder
    cachedAt?: SortOrder
  }

  export type CatalogCardMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    setName?: SortOrder
    setId?: SortOrder
    imageSmall?: SortOrder
    imageLarge?: SortOrder
    rarity?: SortOrder
    cachedAt?: SortOrder
  }

  export type PageCreateNestedManyWithoutBinderInput = {
    create?: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput> | PageCreateWithoutBinderInput[] | PageUncheckedCreateWithoutBinderInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBinderInput | PageCreateOrConnectWithoutBinderInput[]
    createMany?: PageCreateManyBinderInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutBinderInput = {
    create?: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput> | PageCreateWithoutBinderInput[] | PageUncheckedCreateWithoutBinderInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBinderInput | PageCreateOrConnectWithoutBinderInput[]
    createMany?: PageCreateManyBinderInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PageUpdateManyWithoutBinderNestedInput = {
    create?: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput> | PageCreateWithoutBinderInput[] | PageUncheckedCreateWithoutBinderInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBinderInput | PageCreateOrConnectWithoutBinderInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutBinderInput | PageUpsertWithWhereUniqueWithoutBinderInput[]
    createMany?: PageCreateManyBinderInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutBinderInput | PageUpdateWithWhereUniqueWithoutBinderInput[]
    updateMany?: PageUpdateManyWithWhereWithoutBinderInput | PageUpdateManyWithWhereWithoutBinderInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutBinderNestedInput = {
    create?: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput> | PageCreateWithoutBinderInput[] | PageUncheckedCreateWithoutBinderInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBinderInput | PageCreateOrConnectWithoutBinderInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutBinderInput | PageUpsertWithWhereUniqueWithoutBinderInput[]
    createMany?: PageCreateManyBinderInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutBinderInput | PageUpdateWithWhereUniqueWithoutBinderInput[]
    updateMany?: PageUpdateManyWithWhereWithoutBinderInput | PageUpdateManyWithWhereWithoutBinderInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type BinderCreateNestedOneWithoutPagesInput = {
    create?: XOR<BinderCreateWithoutPagesInput, BinderUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BinderCreateOrConnectWithoutPagesInput
    connect?: BinderWhereUniqueInput
  }

  export type SlotCreateNestedManyWithoutPageInput = {
    create?: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput> | SlotCreateWithoutPageInput[] | SlotUncheckedCreateWithoutPageInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutPageInput | SlotCreateOrConnectWithoutPageInput[]
    createMany?: SlotCreateManyPageInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type SlotUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput> | SlotCreateWithoutPageInput[] | SlotUncheckedCreateWithoutPageInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutPageInput | SlotCreateOrConnectWithoutPageInput[]
    createMany?: SlotCreateManyPageInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type BinderUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<BinderCreateWithoutPagesInput, BinderUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BinderCreateOrConnectWithoutPagesInput
    upsert?: BinderUpsertWithoutPagesInput
    connect?: BinderWhereUniqueInput
    update?: XOR<XOR<BinderUpdateToOneWithWhereWithoutPagesInput, BinderUpdateWithoutPagesInput>, BinderUncheckedUpdateWithoutPagesInput>
  }

  export type SlotUpdateManyWithoutPageNestedInput = {
    create?: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput> | SlotCreateWithoutPageInput[] | SlotUncheckedCreateWithoutPageInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutPageInput | SlotCreateOrConnectWithoutPageInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutPageInput | SlotUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: SlotCreateManyPageInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutPageInput | SlotUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutPageInput | SlotUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type SlotUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput> | SlotCreateWithoutPageInput[] | SlotUncheckedCreateWithoutPageInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutPageInput | SlotCreateOrConnectWithoutPageInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutPageInput | SlotUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: SlotCreateManyPageInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutPageInput | SlotUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutPageInput | SlotUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type PageCreateNestedOneWithoutSlotsInput = {
    create?: XOR<PageCreateWithoutSlotsInput, PageUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: PageCreateOrConnectWithoutSlotsInput
    connect?: PageWhereUniqueInput
  }

  export type CatalogCardCreateNestedOneWithoutSlotsInput = {
    create?: XOR<CatalogCardCreateWithoutSlotsInput, CatalogCardUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: CatalogCardCreateOrConnectWithoutSlotsInput
    connect?: CatalogCardWhereUniqueInput
  }

  export type PageUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: XOR<PageCreateWithoutSlotsInput, PageUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: PageCreateOrConnectWithoutSlotsInput
    upsert?: PageUpsertWithoutSlotsInput
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutSlotsInput, PageUpdateWithoutSlotsInput>, PageUncheckedUpdateWithoutSlotsInput>
  }

  export type CatalogCardUpdateOneWithoutSlotsNestedInput = {
    create?: XOR<CatalogCardCreateWithoutSlotsInput, CatalogCardUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: CatalogCardCreateOrConnectWithoutSlotsInput
    upsert?: CatalogCardUpsertWithoutSlotsInput
    disconnect?: CatalogCardWhereInput | boolean
    delete?: CatalogCardWhereInput | boolean
    connect?: CatalogCardWhereUniqueInput
    update?: XOR<XOR<CatalogCardUpdateToOneWithWhereWithoutSlotsInput, CatalogCardUpdateWithoutSlotsInput>, CatalogCardUncheckedUpdateWithoutSlotsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SlotCreateNestedManyWithoutCatalogCardInput = {
    create?: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput> | SlotCreateWithoutCatalogCardInput[] | SlotUncheckedCreateWithoutCatalogCardInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutCatalogCardInput | SlotCreateOrConnectWithoutCatalogCardInput[]
    createMany?: SlotCreateManyCatalogCardInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type SlotUncheckedCreateNestedManyWithoutCatalogCardInput = {
    create?: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput> | SlotCreateWithoutCatalogCardInput[] | SlotUncheckedCreateWithoutCatalogCardInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutCatalogCardInput | SlotCreateOrConnectWithoutCatalogCardInput[]
    createMany?: SlotCreateManyCatalogCardInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type SlotUpdateManyWithoutCatalogCardNestedInput = {
    create?: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput> | SlotCreateWithoutCatalogCardInput[] | SlotUncheckedCreateWithoutCatalogCardInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutCatalogCardInput | SlotCreateOrConnectWithoutCatalogCardInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutCatalogCardInput | SlotUpsertWithWhereUniqueWithoutCatalogCardInput[]
    createMany?: SlotCreateManyCatalogCardInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutCatalogCardInput | SlotUpdateWithWhereUniqueWithoutCatalogCardInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutCatalogCardInput | SlotUpdateManyWithWhereWithoutCatalogCardInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type SlotUncheckedUpdateManyWithoutCatalogCardNestedInput = {
    create?: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput> | SlotCreateWithoutCatalogCardInput[] | SlotUncheckedCreateWithoutCatalogCardInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutCatalogCardInput | SlotCreateOrConnectWithoutCatalogCardInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutCatalogCardInput | SlotUpsertWithWhereUniqueWithoutCatalogCardInput[]
    createMany?: SlotCreateManyCatalogCardInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutCatalogCardInput | SlotUpdateWithWhereUniqueWithoutCatalogCardInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutCatalogCardInput | SlotUpdateManyWithWhereWithoutCatalogCardInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PageCreateWithoutBinderInput = {
    id?: string
    pageIndex: number
    slots?: SlotCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutBinderInput = {
    id?: string
    pageIndex: number
    slots?: SlotUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutBinderInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput>
  }

  export type PageCreateManyBinderInputEnvelope = {
    data: PageCreateManyBinderInput | PageCreateManyBinderInput[]
    skipDuplicates?: boolean
  }

  export type PageUpsertWithWhereUniqueWithoutBinderInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutBinderInput, PageUncheckedUpdateWithoutBinderInput>
    create: XOR<PageCreateWithoutBinderInput, PageUncheckedCreateWithoutBinderInput>
  }

  export type PageUpdateWithWhereUniqueWithoutBinderInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutBinderInput, PageUncheckedUpdateWithoutBinderInput>
  }

  export type PageUpdateManyWithWhereWithoutBinderInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutBinderInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    id?: StringFilter<"Page"> | string
    pageIndex?: IntFilter<"Page"> | number
    binderId?: StringFilter<"Page"> | string
  }

  export type BinderCreateWithoutPagesInput = {
    id?: string
    nickname: string
    color?: string
    layoutRows: number
    layoutCols: number
    lastViewedPage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinderUncheckedCreateWithoutPagesInput = {
    id?: string
    nickname: string
    color?: string
    layoutRows: number
    layoutCols: number
    lastViewedPage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinderCreateOrConnectWithoutPagesInput = {
    where: BinderWhereUniqueInput
    create: XOR<BinderCreateWithoutPagesInput, BinderUncheckedCreateWithoutPagesInput>
  }

  export type SlotCreateWithoutPageInput = {
    id?: string
    row: number
    col: number
    catalogCard?: CatalogCardCreateNestedOneWithoutSlotsInput
  }

  export type SlotUncheckedCreateWithoutPageInput = {
    id?: string
    row: number
    col: number
    catalogCardId?: string | null
  }

  export type SlotCreateOrConnectWithoutPageInput = {
    where: SlotWhereUniqueInput
    create: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput>
  }

  export type SlotCreateManyPageInputEnvelope = {
    data: SlotCreateManyPageInput | SlotCreateManyPageInput[]
    skipDuplicates?: boolean
  }

  export type BinderUpsertWithoutPagesInput = {
    update: XOR<BinderUpdateWithoutPagesInput, BinderUncheckedUpdateWithoutPagesInput>
    create: XOR<BinderCreateWithoutPagesInput, BinderUncheckedCreateWithoutPagesInput>
    where?: BinderWhereInput
  }

  export type BinderUpdateToOneWithWhereWithoutPagesInput = {
    where?: BinderWhereInput
    data: XOR<BinderUpdateWithoutPagesInput, BinderUncheckedUpdateWithoutPagesInput>
  }

  export type BinderUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinderUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    layoutRows?: IntFieldUpdateOperationsInput | number
    layoutCols?: IntFieldUpdateOperationsInput | number
    lastViewedPage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotUpsertWithWhereUniqueWithoutPageInput = {
    where: SlotWhereUniqueInput
    update: XOR<SlotUpdateWithoutPageInput, SlotUncheckedUpdateWithoutPageInput>
    create: XOR<SlotCreateWithoutPageInput, SlotUncheckedCreateWithoutPageInput>
  }

  export type SlotUpdateWithWhereUniqueWithoutPageInput = {
    where: SlotWhereUniqueInput
    data: XOR<SlotUpdateWithoutPageInput, SlotUncheckedUpdateWithoutPageInput>
  }

  export type SlotUpdateManyWithWhereWithoutPageInput = {
    where: SlotScalarWhereInput
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyWithoutPageInput>
  }

  export type SlotScalarWhereInput = {
    AND?: SlotScalarWhereInput | SlotScalarWhereInput[]
    OR?: SlotScalarWhereInput[]
    NOT?: SlotScalarWhereInput | SlotScalarWhereInput[]
    id?: StringFilter<"Slot"> | string
    row?: IntFilter<"Slot"> | number
    col?: IntFilter<"Slot"> | number
    pageId?: StringFilter<"Slot"> | string
    catalogCardId?: StringNullableFilter<"Slot"> | string | null
  }

  export type PageCreateWithoutSlotsInput = {
    id?: string
    pageIndex: number
    binder: BinderCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateWithoutSlotsInput = {
    id?: string
    pageIndex: number
    binderId: string
  }

  export type PageCreateOrConnectWithoutSlotsInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutSlotsInput, PageUncheckedCreateWithoutSlotsInput>
  }

  export type CatalogCardCreateWithoutSlotsInput = {
    id?: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity?: string | null
    cachedAt?: Date | string
  }

  export type CatalogCardUncheckedCreateWithoutSlotsInput = {
    id?: string
    externalId: string
    name: string
    number: string
    setName: string
    setId: string
    imageSmall: string
    imageLarge: string
    rarity?: string | null
    cachedAt?: Date | string
  }

  export type CatalogCardCreateOrConnectWithoutSlotsInput = {
    where: CatalogCardWhereUniqueInput
    create: XOR<CatalogCardCreateWithoutSlotsInput, CatalogCardUncheckedCreateWithoutSlotsInput>
  }

  export type PageUpsertWithoutSlotsInput = {
    update: XOR<PageUpdateWithoutSlotsInput, PageUncheckedUpdateWithoutSlotsInput>
    create: XOR<PageCreateWithoutSlotsInput, PageUncheckedCreateWithoutSlotsInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutSlotsInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutSlotsInput, PageUncheckedUpdateWithoutSlotsInput>
  }

  export type PageUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    binder?: BinderUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    binderId?: StringFieldUpdateOperationsInput | string
  }

  export type CatalogCardUpsertWithoutSlotsInput = {
    update: XOR<CatalogCardUpdateWithoutSlotsInput, CatalogCardUncheckedUpdateWithoutSlotsInput>
    create: XOR<CatalogCardCreateWithoutSlotsInput, CatalogCardUncheckedCreateWithoutSlotsInput>
    where?: CatalogCardWhereInput
  }

  export type CatalogCardUpdateToOneWithWhereWithoutSlotsInput = {
    where?: CatalogCardWhereInput
    data: XOR<CatalogCardUpdateWithoutSlotsInput, CatalogCardUncheckedUpdateWithoutSlotsInput>
  }

  export type CatalogCardUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogCardUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    setId?: StringFieldUpdateOperationsInput | string
    imageSmall?: StringFieldUpdateOperationsInput | string
    imageLarge?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotCreateWithoutCatalogCardInput = {
    id?: string
    row: number
    col: number
    page: PageCreateNestedOneWithoutSlotsInput
  }

  export type SlotUncheckedCreateWithoutCatalogCardInput = {
    id?: string
    row: number
    col: number
    pageId: string
  }

  export type SlotCreateOrConnectWithoutCatalogCardInput = {
    where: SlotWhereUniqueInput
    create: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput>
  }

  export type SlotCreateManyCatalogCardInputEnvelope = {
    data: SlotCreateManyCatalogCardInput | SlotCreateManyCatalogCardInput[]
    skipDuplicates?: boolean
  }

  export type SlotUpsertWithWhereUniqueWithoutCatalogCardInput = {
    where: SlotWhereUniqueInput
    update: XOR<SlotUpdateWithoutCatalogCardInput, SlotUncheckedUpdateWithoutCatalogCardInput>
    create: XOR<SlotCreateWithoutCatalogCardInput, SlotUncheckedCreateWithoutCatalogCardInput>
  }

  export type SlotUpdateWithWhereUniqueWithoutCatalogCardInput = {
    where: SlotWhereUniqueInput
    data: XOR<SlotUpdateWithoutCatalogCardInput, SlotUncheckedUpdateWithoutCatalogCardInput>
  }

  export type SlotUpdateManyWithWhereWithoutCatalogCardInput = {
    where: SlotScalarWhereInput
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyWithoutCatalogCardInput>
  }

  export type PageCreateManyBinderInput = {
    id?: string
    pageIndex: number
  }

  export type PageUpdateWithoutBinderInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    slots?: SlotUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutBinderInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
    slots?: SlotUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutBinderInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageIndex?: IntFieldUpdateOperationsInput | number
  }

  export type SlotCreateManyPageInput = {
    id?: string
    row: number
    col: number
    catalogCardId?: string | null
  }

  export type SlotUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    catalogCard?: CatalogCardUpdateOneWithoutSlotsNestedInput
  }

  export type SlotUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    catalogCardId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SlotUncheckedUpdateManyWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    catalogCardId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SlotCreateManyCatalogCardInput = {
    id?: string
    row: number
    col: number
    pageId: string
  }

  export type SlotUpdateWithoutCatalogCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    page?: PageUpdateOneRequiredWithoutSlotsNestedInput
  }

  export type SlotUncheckedUpdateWithoutCatalogCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type SlotUncheckedUpdateManyWithoutCatalogCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    row?: IntFieldUpdateOperationsInput | number
    col?: IntFieldUpdateOperationsInput | number
    pageId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}