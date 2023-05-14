export const formatDate = (date) => {
    const dateTime = new Date(date);
    const formattedDate = dateTime.getDate() + "/" + dateTime.getMonth() + "/" + dateTime.getFullYear();
    return formattedDate;
}