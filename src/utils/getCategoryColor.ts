export const getCategoryColor = (category: string) => {
    switch (category) {
        case "sport":
            return "#FFA629"
        case "charity":
            return "#14AE5C"
        case "integration": 
            return "#0D51FF"
        default:
            return "#0D51FF" 
    }
}