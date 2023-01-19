export const checkArray = (value: [string]) => {

    if(typeof value  !== "object" ) {
        throw new Error('incorrect format.  [Array where each element has at least 3 characters]');
    }
    value.forEach((e) => {
        if(!(e && e.length > 3)){
            throw new Error('incorrect format, [Array where each element has at least 3 characters]');
        }
    })
    
    return true;
  }