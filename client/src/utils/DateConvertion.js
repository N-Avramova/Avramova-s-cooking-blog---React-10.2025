
export function formattedDate(createdOn) {
    if(createdOn == undefined) {
        return "";
    }

    if (typeof createdOn === "number") {
        createdOn = new Date(Number(createdOn));  
    }
    else if (typeof createdOn === "string") {
        createdOn = new Date(createdOn);
    }
    const formattedCreatedDate = isNaN(createdOn.getTime()) ? "" : createdOn.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return formattedCreatedDate;
};