export function toDDMMYYYY(isoString) {
    const date = new Date(isoString);
  
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const yyyy = date.getUTCFullYear();
  
    return `${dd}-${mm}-${yyyy}`;
  }
  