function removeUndefinedUpdateFields<T extends object>(updateData: T) {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(updateData).filter(([_, value]) => value !== undefined),
  );
}

export default removeUndefinedUpdateFields;
