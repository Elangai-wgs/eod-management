export const isAllowedTo = (permissions, keys = [],isEvery=false) => {
    if (!Array.isArray(permissions) || !Array.isArray(keys)) {
      return false; // Ensure both inputs are arrays
    }
    if(isEvery){
        return keys.every(key => permissions.includes(key))
    }else{
        return keys.some((key) => permissions.includes(key));
    }
  };
  