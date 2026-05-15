export interface IWeldersActivities {
  welder_activity_uuid: string;
  registered_at: Date;
  produced_quantity: number;
  welder_uuid: string;
  product_uuid: string;
}

/**
 * Interface para o registro de atividade de soldador.
 * @extends IWeldersActivities
 * @see IWeldersActivities
 */
export interface ICreateWeldersActivities extends Omit<
  IWeldersActivities,
  "welder_activity_uuid" | "registered_at"
> {}

/**
 * Interface para a atualização de atividade de soldador.
 * @extends ICreateWeldersActivities
 * @see ICreateWeldersActivities
 */
export interface IUpdateWeldersActivities extends Partial<ICreateWeldersActivities> {}
