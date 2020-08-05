

export const companyPositionLever = val => {
    switch(val) {
        case "城市负责人":
            return 1001
        case "城市负责人(储备)":
            return 1001
        case "分公司负责人":
            return 1002
        case "分公司负责人(储备)":
            return 1002
        case "区长":
            return 1003
        case "区长(储备)":
            return 1003
        case "部长":
            return 1004
        case "部长(储备)":
            return 1004
        case "顾问":
            return 1004
        case "学徒":
            return 1004
        default: 
            return new Error("类型出错")
    }
}

export const setupDeepTree = (node, delDeep)=> {
    if(node.level == delDeep) node.departmentList = null 
    else node.disabled = true
    if(node.departmentList == null) return
    
    for(let key in node.departmentList) {
        setupDeepTree(node.departmentList[key],delDeep)
    }

}