

//头文件分析工具
//包含头文件依赖分析结构设计
    //结构生成
//包含头文件依赖展示图形化
    //找展示树结构依赖的效果展示api

//技术选型
    //使用nodejs作为前期file遍历工具
    //使用python作为后期图形化展示工具

//架构设计

var allTools = {
    //建立所有fileName(含后缀，含包含简单路径)的依赖文件
    //但是遍历文件只会出现文件名，所以需要至少保留4层目录信息来预防有路径包含现象
    //类似 "sfosng.c": [sfx.h, aa.h, sfosng.h]
    //建立这个结构后，可以遍历然后，依赖禁止出现同名文件，如果真有同名文件，需要做特殊处理
    allMap: {},
    //只有头文件依赖关系，包含.h; .hpp，不存在.cpp依赖另一个.cpp的情况
    allMapOnlyHead: {},
    //搜索文件夹集合
    allFilesPath: [],

    //遍历所有c类文件, 生成allMap等数据
    foreachFiles: function (folder) {

    },

    //检查是不是C类文件
    //包括.c; .cpp; .h; .hpp; .cc这些
    checkCLikeFile: function (fileName) {

    },

    //构建树形结构的依赖关系图
    buildPythonTree: function () {
        //调用python生成依赖关系图
    },


}
