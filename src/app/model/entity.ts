interface EntityState<V> {
  ids: string[] | number[];
  entities: { [id: string | number]: V };
}
