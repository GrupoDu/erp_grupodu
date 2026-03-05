/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequest {
  /** @format email */
  email: string;
  /** @format password */
  senha: string;
  user_type: string;
}

export interface Goal {
  goal_id: string;
  goal_title: string;
  goal_description?: string | null;
  goal_type: string;
  /** @format date-time */
  goal_deadline: string;
  employee_goal?: string | null;
  goal_status: string;
}

export interface User {
  name: string;
  /** @format email */
  email: string;
  /** @format password */
  password: string;
  user_type: string;
}

export interface Product {
  name: string;
  description: string;
  product_type: string;
  image: string;
  features?: string[];
  acronym?: string | null;
  /** Campo JSON flexível */
  composition?: object;
  /** @format decimal */
  stock_quantity?: number;
}

export interface Employee {
  name: string;
  employee_type: string;
}

export interface ProducedQuantity {
  productsQuantity: number;
}

export interface Feedback {
  card_name: string;
  card_description: string;
}

export interface ProductionOrder {
  production_order_title: string;
  production_order_description?: string | null;
  /** @format date-time */
  production_order_deadline: string;
  /** @format decimal */
  product_quantity: number;
  cut_assistant?: string | null;
  fold_assistant?: string | null;
  finishing_assistant?: string | null;
  paint_assistant?: string | null;
  employee_uuid?: string | null;
  product_uuid: string;
  client_uuid: string;
}

export interface DeliveryOrder {
  delivered_product_quantity: number;
  requested_product_quantity: number;
}

export interface Error {
  message?: string;
  code?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://gcp-backend-gnxf.onrender.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title GCP Backend API
 * @version 1.0.0
 * @baseUrl https://gcp-backend-gnxf.onrender.com
 *
 * API para gerenciamento de metas, usuários, produtos, funcionários e análises
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags Login
     * @name LoginCreate
     * @summary Realiza login do usuário
     * @request POST:/login
     * @secure
     */
    loginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name RefreshCreate
     * @summary Renova o token de acesso
     * @request POST:/login/refresh
     * @secure
     */
    refreshCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login/refresh`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name VerifyList
     * @summary Verifica se o token é válido
     * @request GET:/login/verify
     * @secure
     */
    verifyList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login/verify`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name LogoutCreate
     * @summary Realiza logout do usuário
     * @request POST:/login/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/login/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  goals = {
    /**
     * No description
     *
     * @tags Goals
     * @name GoalsList
     * @summary Lista todas as metas
     * @request GET:/goals
     * @secure
     */
    goalsList: (params: RequestParams = {}) =>
      this.request<Goal[], void>({
        path: `/goals`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Goals
     * @name GoalsCreate
     * @summary Cria uma nova meta (Apenas Admin)
     * @request POST:/goals
     * @secure
     */
    goalsCreate: (data: Goal, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/goals`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Goals
     * @name GoalsDelete
     * @summary Remove uma meta (Apenas Admin)
     * @request DELETE:/goals/{uuid}
     * @secure
     */
    goalsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/goals/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Goals
     * @name GoalsUpdate
     * @summary Atualiza uma meta (Apenas Admin)
     * @request PUT:/goals/{uuid}
     * @secure
     */
    goalsUpdate: (
      uuid: string,
      data: {
        goal_id?: string;
        goal_title?: string;
        goal_description?: string | null;
        goal_type?: string;
        /** @format date-time */
        goal_deadline?: string;
        employee_goal?: string | null;
        goal_status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/goals/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersList
     * @summary Lista todos os usuários (Apenas Admin)
     * @request GET:/users
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], void>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @summary Cria um novo usuário (Apenas Admin)
     * @request POST:/users
     * @secure
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SupervisorsList
     * @summary Lista todos os supervisores
     * @request GET:/users/supervisors
     * @secure
     */
    supervisorsList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/supervisors`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ValidatorList
     * @summary Valida informações do usuário
     * @request GET:/users/validator
     * @secure
     */
    validatorList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/validator`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDetail
     * @summary Busca um usuário por UUID (Apenas Admin)
     * @request GET:/users/{uuid}
     * @secure
     */
    usersDetail: (uuid: string, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${uuid}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDelete
     * @summary Remove um usuário (Apenas Admin)
     * @request DELETE:/users/{uuid}
     * @secure
     */
    usersDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdate
     * @summary Atualiza um usuário (Apenas Admin)
     * @request PUT:/users/{uuid}
     * @secure
     */
    usersUpdate: (
      uuid: string,
      data: {
        name?: string;
        /** @format email */
        email?: string;
        /** @format password */
        password?: string;
        user_type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/users/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags Products
     * @name ProductsList
     * @summary Lista todos os produtos
     * @request GET:/products
     * @secure
     */
    productsList: (params: RequestParams = {}) =>
      this.request<Product[], void>({
        path: `/products`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsCreate
     * @summary Cria um novo produto (Apenas Admin)
     * @request POST:/products
     * @secure
     */
    productsCreate: (data: Product, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsUpdate
     * @summary Atualiza um produto
     * @request PUT:/products/{uuid}
     * @secure
     */
    productsUpdate: (
      uuid: string,
      data: {
        name?: string;
        description?: string;
        product_type?: string;
        image?: string;
        features?: string[];
        acronym?: string | null;
        composition?: object;
        /** @format decimal */
        stock_quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/products/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsDelete
     * @summary Remove um produto (Apenas Admin)
     * @request DELETE:/products/{uuid}
     * @secure
     */
    productsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  employees = {
    /**
     * No description
     *
     * @tags Employees
     * @name EmployeesList
     * @summary Lista todos os funcionários
     * @request GET:/employees
     * @secure
     */
    employeesList: (params: RequestParams = {}) =>
      this.request<Employee[], void>({
        path: `/employees`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name EmployeesCreate
     * @summary Cria um novo funcionário (Apenas Admin)
     * @request POST:/employees
     * @secure
     */
    employeesCreate: (data: Employee, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/employees`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name EmployeesDetail
     * @summary Busca um funcionário por UUID (Apenas Admin)
     * @request GET:/employees/{uuid}
     * @secure
     */
    employeesDetail: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/employees/${uuid}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name EmployeesDelete
     * @summary Remove um funcionário (Apenas Admin)
     * @request DELETE:/employees/{uuid}
     * @secure
     */
    employeesDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/employees/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name EmployeesUpdate
     * @summary Atualiza um funcionário (Apenas Admin)
     * @request PUT:/employees/{uuid}
     * @secure
     */
    employeesUpdate: (
      uuid: string,
      data: {
        name?: string;
        employee_type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/employees/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name ActivityUpdate
     * @summary Atualiza a atividade de um funcionário
     * @request PUT:/employees/activity/{uuid}
     * @secure
     */
    activityUpdate: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/employees/activity/${uuid}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Employees
     * @name ProducedQuantityUpdate
     * @summary Atualiza a quantidade produzida por um funcionário
     * @request PUT:/employees/producedQuantity/{uuid}
     * @secure
     */
    producedQuantityUpdate: (
      uuid: string,
      data: ProducedQuantity,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/employees/producedQuantity/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  feedback = {
    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackCreate
     * @summary Envia um feedback
     * @request POST:/feedback
     * @secure
     */
    feedbackCreate: (data: Feedback, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/feedback`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  anualAnalysis = {
    /**
     * No description
     *
     * @tags AnualAnalysis
     * @name AnualAnalysisList
     * @summary Obtém análise anual (Apenas Admin)
     * @request GET:/anualAnalysis
     * @secure
     */
    anualAnalysisList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/anualAnalysis`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AnualAnalysis
     * @name UpdateAnalysisUpdate
     * @summary Atualiza a análise anual
     * @request PUT:/anualAnalysis/updateAnalysis
     * @secure
     */
    updateAnalysisUpdate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/anualAnalysis/updateAnalysis`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  goalsAnalysis = {
    /**
     * No description
     *
     * @tags GoalsAnalysis
     * @name GoalsAnalysisList
     * @summary Obtém análise de metas (Apenas Admin)
     * @request GET:/goalsAnalysis
     * @secure
     */
    goalsAnalysisList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/goalsAnalysis`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  productionOrder = {
    /**
     * No description
     *
     * @tags ProductionOrder
     * @name ProductionOrderList
     * @summary Lista todas as ordens de produção
     * @request GET:/productionOrder
     * @secure
     */
    productionOrderList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/productionOrder`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrder
     * @name ProductionOrderCreate
     * @summary Cria uma nova ordem de produção
     * @request POST:/productionOrder
     * @secure
     */
    productionOrderCreate: (
      data: ProductionOrder,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/productionOrder`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrder
     * @name ProductionOrderDetail
     * @summary Busca uma ordem de produção por UUID
     * @request GET:/productionOrder/{uuid}
     * @secure
     */
    productionOrderDetail: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/productionOrder/${uuid}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrder
     * @name ProductionOrderDelete
     * @summary Remove uma ordem de produção (Apenas Admin)
     * @request DELETE:/productionOrder/{uuid}
     * @secure
     */
    productionOrderDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/productionOrder/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrder
     * @name ProductionOrderUpdate
     * @summary Atualiza uma ordem de produção
     * @request PUT:/productionOrder/{uuid}
     * @secure
     */
    productionOrderUpdate: (
      uuid: string,
      data: {
        production_order_title?: string;
        production_order_description?: string | null;
        /** @format date-time */
        production_order_deadline?: string;
        /** @format decimal */
        product_quantity?: number;
        cut_assistant?: string | null;
        fold_assistant?: string | null;
        finishing_assistant?: string | null;
        paint_assistant?: string | null;
        employee_uuid?: string | null;
        product_uuid?: string;
        client_uuid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/productionOrder/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrder
     * @name DeliverUpdate
     * @summary Registra a entrega de uma ordem de produção
     * @request PUT:/productionOrder/deliver/{production_order_id}
     * @secure
     */
    deliverUpdate: (
      productionOrderId: string,
      data: DeliveryOrder,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/productionOrder/deliver/${productionOrderId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  employeesAnalysis = {
    /**
     * No description
     *
     * @tags EmployeesAnalysis
     * @name EmployeesAnalysisList
     * @summary Obtém análise de funcionários (Apenas Admin)
     * @request GET:/employees-analysis
     * @secure
     */
    employeesAnalysisList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/employees-analysis`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  productionOrderAnalysis = {
    /**
     * No description
     *
     * @tags ProductionOrderAnalysis
     * @name ProductionOrderAnalysisList
     * @summary Obtém análise de ordens de produção (Apenas Admin)
     * @request GET:/productionOrderAnalysis
     * @secure
     */
    productionOrderAnalysisList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/productionOrderAnalysis`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
