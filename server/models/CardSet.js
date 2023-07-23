
function dataToCardSet(data) {
    return {
        id: data.setId,
        name: data.setName,
        description: data.setDesc,
        illustration_path: data.setIllustration ? data.setIllustration : "",
    }
}


function cardSetToData(cardSet) {
    let data = [];

    cardSet.forEach((set) => {
        data.push({
            setId: set.id,
            setName: set.name,
            setDesc: set.description,
            setIllustration: set.illustration_path ? set.illustration_path : "",
            setCreatedAt: set.created_date,
            setUpdatedAt: set.updated_date,
        })
    });

    return data;
}

module.exports = {
    dataToCardSet,
    cardSetToData
}
