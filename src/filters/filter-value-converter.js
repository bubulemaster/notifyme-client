/**
 * Filter on array from view.
 */
export class FilterValueConverter {
  /**
   * @param array current array to filter
   * @param searchTerm text to search
   * @param filter callback
   */
  toView (array, searchTerm, filterFunc) {
    return array.filter(item =>
      searchTerm && searchTerm.length > 0
        ? filterFunc(searchTerm, item)
        : true
    )
  }
}
