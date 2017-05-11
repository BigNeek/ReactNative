// we just use export here when we are potentially exporting many things
export function selectLibrary(libraryId) {
  return {
    type: 'select_library',
    payload: libraryId
  };
}
