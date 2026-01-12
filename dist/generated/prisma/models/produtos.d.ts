import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model produtos
 *
 */
export type produtosModel = runtime.Types.Result.DefaultSelection<Prisma.$produtosPayload>;
export type AggregateProdutos = {
    _count: ProdutosCountAggregateOutputType | null;
    _min: ProdutosMinAggregateOutputType | null;
    _max: ProdutosMaxAggregateOutputType | null;
};
export type ProdutosMinAggregateOutputType = {
    created_at: Date | null;
    name: string | null;
    description: string | null;
    product_type: string | null;
    image: string | null;
    acronym: string | null;
    uuid: string | null;
};
export type ProdutosMaxAggregateOutputType = {
    created_at: Date | null;
    name: string | null;
    description: string | null;
    product_type: string | null;
    image: string | null;
    acronym: string | null;
    uuid: string | null;
};
export type ProdutosCountAggregateOutputType = {
    created_at: number;
    name: number;
    description: number;
    product_type: number;
    image: number;
    features: number;
    acronym: number;
    composition: number;
    uuid: number;
    _all: number;
};
export type ProdutosMinAggregateInputType = {
    created_at?: true;
    name?: true;
    description?: true;
    product_type?: true;
    image?: true;
    acronym?: true;
    uuid?: true;
};
export type ProdutosMaxAggregateInputType = {
    created_at?: true;
    name?: true;
    description?: true;
    product_type?: true;
    image?: true;
    acronym?: true;
    uuid?: true;
};
export type ProdutosCountAggregateInputType = {
    created_at?: true;
    name?: true;
    description?: true;
    product_type?: true;
    image?: true;
    features?: true;
    acronym?: true;
    composition?: true;
    uuid?: true;
    _all?: true;
};
export type ProdutosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to aggregate.
     */
    where?: Prisma.produtosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produtos to fetch.
     */
    orderBy?: Prisma.produtosOrderByWithRelationInput | Prisma.produtosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.produtosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned produtos
    **/
    _count?: true | ProdutosCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProdutosMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProdutosMaxAggregateInputType;
};
export type GetProdutosAggregateType<T extends ProdutosAggregateArgs> = {
    [P in keyof T & keyof AggregateProdutos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProdutos[P]> : Prisma.GetScalarType<T[P], AggregateProdutos[P]>;
};
export type produtosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.produtosWhereInput;
    orderBy?: Prisma.produtosOrderByWithAggregationInput | Prisma.produtosOrderByWithAggregationInput[];
    by: Prisma.ProdutosScalarFieldEnum[] | Prisma.ProdutosScalarFieldEnum;
    having?: Prisma.produtosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProdutosCountAggregateInputType | true;
    _min?: ProdutosMinAggregateInputType;
    _max?: ProdutosMaxAggregateInputType;
};
export type ProdutosGroupByOutputType = {
    created_at: Date;
    name: string;
    description: string;
    product_type: string;
    image: string;
    features: string[];
    acronym: string | null;
    composition: runtime.JsonValue | null;
    uuid: string;
    _count: ProdutosCountAggregateOutputType | null;
    _min: ProdutosMinAggregateOutputType | null;
    _max: ProdutosMaxAggregateOutputType | null;
};
type GetProdutosGroupByPayload<T extends produtosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProdutosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProdutosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProdutosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProdutosGroupByOutputType[P]>;
}>>;
export type produtosWhereInput = {
    AND?: Prisma.produtosWhereInput | Prisma.produtosWhereInput[];
    OR?: Prisma.produtosWhereInput[];
    NOT?: Prisma.produtosWhereInput | Prisma.produtosWhereInput[];
    created_at?: Prisma.DateTimeFilter<"produtos"> | Date | string;
    name?: Prisma.StringFilter<"produtos"> | string;
    description?: Prisma.StringFilter<"produtos"> | string;
    product_type?: Prisma.StringFilter<"produtos"> | string;
    image?: Prisma.StringFilter<"produtos"> | string;
    features?: Prisma.StringNullableListFilter<"produtos">;
    acronym?: Prisma.StringNullableFilter<"produtos"> | string | null;
    composition?: Prisma.JsonNullableFilter<"produtos">;
    uuid?: Prisma.UuidFilter<"produtos"> | string;
};
export type produtosOrderByWithRelationInput = {
    created_at?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    product_type?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    features?: Prisma.SortOrder;
    acronym?: Prisma.SortOrderInput | Prisma.SortOrder;
    composition?: Prisma.SortOrderInput | Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
};
export type produtosWhereUniqueInput = Prisma.AtLeast<{
    name?: string;
    uuid?: string;
    AND?: Prisma.produtosWhereInput | Prisma.produtosWhereInput[];
    OR?: Prisma.produtosWhereInput[];
    NOT?: Prisma.produtosWhereInput | Prisma.produtosWhereInput[];
    created_at?: Prisma.DateTimeFilter<"produtos"> | Date | string;
    description?: Prisma.StringFilter<"produtos"> | string;
    product_type?: Prisma.StringFilter<"produtos"> | string;
    image?: Prisma.StringFilter<"produtos"> | string;
    features?: Prisma.StringNullableListFilter<"produtos">;
    acronym?: Prisma.StringNullableFilter<"produtos"> | string | null;
    composition?: Prisma.JsonNullableFilter<"produtos">;
}, "uuid" | "name">;
export type produtosOrderByWithAggregationInput = {
    created_at?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    product_type?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    features?: Prisma.SortOrder;
    acronym?: Prisma.SortOrderInput | Prisma.SortOrder;
    composition?: Prisma.SortOrderInput | Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    _count?: Prisma.produtosCountOrderByAggregateInput;
    _max?: Prisma.produtosMaxOrderByAggregateInput;
    _min?: Prisma.produtosMinOrderByAggregateInput;
};
export type produtosScalarWhereWithAggregatesInput = {
    AND?: Prisma.produtosScalarWhereWithAggregatesInput | Prisma.produtosScalarWhereWithAggregatesInput[];
    OR?: Prisma.produtosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.produtosScalarWhereWithAggregatesInput | Prisma.produtosScalarWhereWithAggregatesInput[];
    created_at?: Prisma.DateTimeWithAggregatesFilter<"produtos"> | Date | string;
    name?: Prisma.StringWithAggregatesFilter<"produtos"> | string;
    description?: Prisma.StringWithAggregatesFilter<"produtos"> | string;
    product_type?: Prisma.StringWithAggregatesFilter<"produtos"> | string;
    image?: Prisma.StringWithAggregatesFilter<"produtos"> | string;
    features?: Prisma.StringNullableListFilter<"produtos">;
    acronym?: Prisma.StringNullableWithAggregatesFilter<"produtos"> | string | null;
    composition?: Prisma.JsonNullableWithAggregatesFilter<"produtos">;
    uuid?: Prisma.UuidWithAggregatesFilter<"produtos"> | string;
};
export type produtosCreateInput = {
    created_at?: Date | string;
    name: string;
    description: string;
    product_type: string;
    image: string;
    features?: Prisma.produtosCreatefeaturesInput | string[];
    acronym?: string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: string;
};
export type produtosUncheckedCreateInput = {
    created_at?: Date | string;
    name: string;
    description: string;
    product_type: string;
    image: string;
    features?: Prisma.produtosCreatefeaturesInput | string[];
    acronym?: string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: string;
};
export type produtosUpdateInput = {
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    product_type?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    features?: Prisma.produtosUpdatefeaturesInput | string[];
    acronym?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type produtosUncheckedUpdateInput = {
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    product_type?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    features?: Prisma.produtosUpdatefeaturesInput | string[];
    acronym?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type produtosCreateManyInput = {
    created_at?: Date | string;
    name: string;
    description: string;
    product_type: string;
    image: string;
    features?: Prisma.produtosCreatefeaturesInput | string[];
    acronym?: string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: string;
};
export type produtosUpdateManyMutationInput = {
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    product_type?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    features?: Prisma.produtosUpdatefeaturesInput | string[];
    acronym?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type produtosUncheckedUpdateManyInput = {
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    product_type?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    features?: Prisma.produtosUpdatefeaturesInput | string[];
    acronym?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    composition?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type produtosCountOrderByAggregateInput = {
    created_at?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    product_type?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    features?: Prisma.SortOrder;
    acronym?: Prisma.SortOrder;
    composition?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
};
export type produtosMaxOrderByAggregateInput = {
    created_at?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    product_type?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    acronym?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
};
export type produtosMinOrderByAggregateInput = {
    created_at?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    product_type?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    acronym?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
};
export type produtosCreatefeaturesInput = {
    set: string[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type produtosUpdatefeaturesInput = {
    set?: string[];
    push?: string | string[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type produtosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    created_at?: boolean;
    name?: boolean;
    description?: boolean;
    product_type?: boolean;
    image?: boolean;
    features?: boolean;
    acronym?: boolean;
    composition?: boolean;
    uuid?: boolean;
}, ExtArgs["result"]["produtos"]>;
export type produtosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    created_at?: boolean;
    name?: boolean;
    description?: boolean;
    product_type?: boolean;
    image?: boolean;
    features?: boolean;
    acronym?: boolean;
    composition?: boolean;
    uuid?: boolean;
}, ExtArgs["result"]["produtos"]>;
export type produtosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    created_at?: boolean;
    name?: boolean;
    description?: boolean;
    product_type?: boolean;
    image?: boolean;
    features?: boolean;
    acronym?: boolean;
    composition?: boolean;
    uuid?: boolean;
}, ExtArgs["result"]["produtos"]>;
export type produtosSelectScalar = {
    created_at?: boolean;
    name?: boolean;
    description?: boolean;
    product_type?: boolean;
    image?: boolean;
    features?: boolean;
    acronym?: boolean;
    composition?: boolean;
    uuid?: boolean;
};
export type produtosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"created_at" | "name" | "description" | "product_type" | "image" | "features" | "acronym" | "composition" | "uuid", ExtArgs["result"]["produtos"]>;
export type $produtosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "produtos";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        created_at: Date;
        name: string;
        description: string;
        product_type: string;
        image: string;
        features: string[];
        acronym: string | null;
        composition: runtime.JsonValue | null;
        uuid: string;
    }, ExtArgs["result"]["produtos"]>;
    composites: {};
};
export type produtosGetPayload<S extends boolean | null | undefined | produtosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$produtosPayload, S>;
export type produtosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<produtosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProdutosCountAggregateInputType | true;
};
export interface produtosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['produtos'];
        meta: {
            name: 'produtos';
        };
    };
    /**
     * Find zero or one Produtos that matches the filter.
     * @param {produtosFindUniqueArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends produtosFindUniqueArgs>(args: Prisma.SelectSubset<T, produtosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Produtos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {produtosFindUniqueOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends produtosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, produtosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends produtosFindFirstArgs>(args?: Prisma.SelectSubset<T, produtosFindFirstArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Produtos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends produtosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, produtosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produtos.findMany()
     *
     * // Get first 10 Produtos
     * const produtos = await prisma.produtos.findMany({ take: 10 })
     *
     * // Only select the `created_at`
     * const produtosWithCreated_atOnly = await prisma.produtos.findMany({ select: { created_at: true } })
     *
     */
    findMany<T extends produtosFindManyArgs>(args?: Prisma.SelectSubset<T, produtosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Produtos.
     * @param {produtosCreateArgs} args - Arguments to create a Produtos.
     * @example
     * // Create one Produtos
     * const Produtos = await prisma.produtos.create({
     *   data: {
     *     // ... data to create a Produtos
     *   }
     * })
     *
     */
    create<T extends produtosCreateArgs>(args: Prisma.SelectSubset<T, produtosCreateArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Produtos.
     * @param {produtosCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends produtosCreateManyArgs>(args?: Prisma.SelectSubset<T, produtosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {produtosCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Produtos and only return the `created_at`
     * const produtosWithCreated_atOnly = await prisma.produtos.createManyAndReturn({
     *   select: { created_at: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends produtosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, produtosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Produtos.
     * @param {produtosDeleteArgs} args - Arguments to delete one Produtos.
     * @example
     * // Delete one Produtos
     * const Produtos = await prisma.produtos.delete({
     *   where: {
     *     // ... filter to delete one Produtos
     *   }
     * })
     *
     */
    delete<T extends produtosDeleteArgs>(args: Prisma.SelectSubset<T, produtosDeleteArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Produtos.
     * @param {produtosUpdateArgs} args - Arguments to update one Produtos.
     * @example
     * // Update one Produtos
     * const produtos = await prisma.produtos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends produtosUpdateArgs>(args: Prisma.SelectSubset<T, produtosUpdateArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Produtos.
     * @param {produtosDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produtos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends produtosDeleteManyArgs>(args?: Prisma.SelectSubset<T, produtosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends produtosUpdateManyArgs>(args: Prisma.SelectSubset<T, produtosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {produtosUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Produtos and only return the `created_at`
     * const produtosWithCreated_atOnly = await prisma.produtos.updateManyAndReturn({
     *   select: { created_at: true },
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
    updateManyAndReturn<T extends produtosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, produtosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Produtos.
     * @param {produtosUpsertArgs} args - Arguments to update or create a Produtos.
     * @example
     * // Update or create a Produtos
     * const produtos = await prisma.produtos.upsert({
     *   create: {
     *     // ... data to create a Produtos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produtos we want to update
     *   }
     * })
     */
    upsert<T extends produtosUpsertArgs>(args: Prisma.SelectSubset<T, produtosUpsertArgs<ExtArgs>>): Prisma.Prisma__produtosClient<runtime.Types.Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produtos.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends produtosCountArgs>(args?: Prisma.Subset<T, produtosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProdutosCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProdutosAggregateArgs>(args: Prisma.Subset<T, ProdutosAggregateArgs>): Prisma.PrismaPromise<GetProdutosAggregateType<T>>;
    /**
     * Group by Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosGroupByArgs} args - Group by arguments.
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
    groupBy<T extends produtosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: produtosGroupByArgs['orderBy'];
    } : {
        orderBy?: produtosGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, produtosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the produtos model
     */
    readonly fields: produtosFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for produtos.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__produtosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the produtos model
 */
export interface produtosFieldRefs {
    readonly created_at: Prisma.FieldRef<"produtos", 'DateTime'>;
    readonly name: Prisma.FieldRef<"produtos", 'String'>;
    readonly description: Prisma.FieldRef<"produtos", 'String'>;
    readonly product_type: Prisma.FieldRef<"produtos", 'String'>;
    readonly image: Prisma.FieldRef<"produtos", 'String'>;
    readonly features: Prisma.FieldRef<"produtos", 'String[]'>;
    readonly acronym: Prisma.FieldRef<"produtos", 'String'>;
    readonly composition: Prisma.FieldRef<"produtos", 'Json'>;
    readonly uuid: Prisma.FieldRef<"produtos", 'String'>;
}
/**
 * produtos findUnique
 */
export type produtosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter, which produtos to fetch.
     */
    where: Prisma.produtosWhereUniqueInput;
};
/**
 * produtos findUniqueOrThrow
 */
export type produtosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter, which produtos to fetch.
     */
    where: Prisma.produtosWhereUniqueInput;
};
/**
 * produtos findFirst
 */
export type produtosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter, which produtos to fetch.
     */
    where?: Prisma.produtosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produtos to fetch.
     */
    orderBy?: Prisma.produtosOrderByWithRelationInput | Prisma.produtosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for produtos.
     */
    cursor?: Prisma.produtosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of produtos.
     */
    distinct?: Prisma.ProdutosScalarFieldEnum | Prisma.ProdutosScalarFieldEnum[];
};
/**
 * produtos findFirstOrThrow
 */
export type produtosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter, which produtos to fetch.
     */
    where?: Prisma.produtosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produtos to fetch.
     */
    orderBy?: Prisma.produtosOrderByWithRelationInput | Prisma.produtosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for produtos.
     */
    cursor?: Prisma.produtosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produtos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of produtos.
     */
    distinct?: Prisma.ProdutosScalarFieldEnum | Prisma.ProdutosScalarFieldEnum[];
};
/**
 * produtos findMany
 */
export type produtosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter, which produtos to fetch.
     */
    where?: Prisma.produtosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produtos to fetch.
     */
    orderBy?: Prisma.produtosOrderByWithRelationInput | Prisma.produtosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing produtos.
     */
    cursor?: Prisma.produtosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produtos.
     */
    skip?: number;
    distinct?: Prisma.ProdutosScalarFieldEnum | Prisma.ProdutosScalarFieldEnum[];
};
/**
 * produtos create
 */
export type produtosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * The data needed to create a produtos.
     */
    data: Prisma.XOR<Prisma.produtosCreateInput, Prisma.produtosUncheckedCreateInput>;
};
/**
 * produtos createMany
 */
export type produtosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many produtos.
     */
    data: Prisma.produtosCreateManyInput | Prisma.produtosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * produtos createManyAndReturn
 */
export type produtosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * The data used to create many produtos.
     */
    data: Prisma.produtosCreateManyInput | Prisma.produtosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * produtos update
 */
export type produtosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * The data needed to update a produtos.
     */
    data: Prisma.XOR<Prisma.produtosUpdateInput, Prisma.produtosUncheckedUpdateInput>;
    /**
     * Choose, which produtos to update.
     */
    where: Prisma.produtosWhereUniqueInput;
};
/**
 * produtos updateMany
 */
export type produtosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update produtos.
     */
    data: Prisma.XOR<Prisma.produtosUpdateManyMutationInput, Prisma.produtosUncheckedUpdateManyInput>;
    /**
     * Filter which produtos to update
     */
    where?: Prisma.produtosWhereInput;
    /**
     * Limit how many produtos to update.
     */
    limit?: number;
};
/**
 * produtos updateManyAndReturn
 */
export type produtosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * The data used to update produtos.
     */
    data: Prisma.XOR<Prisma.produtosUpdateManyMutationInput, Prisma.produtosUncheckedUpdateManyInput>;
    /**
     * Filter which produtos to update
     */
    where?: Prisma.produtosWhereInput;
    /**
     * Limit how many produtos to update.
     */
    limit?: number;
};
/**
 * produtos upsert
 */
export type produtosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * The filter to search for the produtos to update in case it exists.
     */
    where: Prisma.produtosWhereUniqueInput;
    /**
     * In case the produtos found by the `where` argument doesn't exist, create a new produtos with this data.
     */
    create: Prisma.XOR<Prisma.produtosCreateInput, Prisma.produtosUncheckedCreateInput>;
    /**
     * In case the produtos was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.produtosUpdateInput, Prisma.produtosUncheckedUpdateInput>;
};
/**
 * produtos delete
 */
export type produtosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
    /**
     * Filter which produtos to delete.
     */
    where: Prisma.produtosWhereUniqueInput;
};
/**
 * produtos deleteMany
 */
export type produtosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to delete
     */
    where?: Prisma.produtosWhereInput;
    /**
     * Limit how many produtos to delete.
     */
    limit?: number;
};
/**
 * produtos without action
 */
export type produtosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: Prisma.produtosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the produtos
     */
    omit?: Prisma.produtosOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=produtos.d.ts.map