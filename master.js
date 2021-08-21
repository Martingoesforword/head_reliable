
var fileType = {
    FILE_TYPE_OTHERS:   0,
    FILE_TYPE_C:        1,
    FILE_TYPE_CPP:      2,
    FILE_TYPE_CC:       3,
    FILE_TYPE_H:        4,
    FILE_TYPE_HPP:      5,
}

var nodeType = {
    TYPE_0:   0,
    TYPE_SAME_NAME:        1,
    TYPE_ONLY_ONE:      2,
}

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
    //建立所有fileName(没有后缀则是系统包含，含后缀则是普通包含)的依赖文件
    //如果有重名文件，则此结构value是个数组
    //value有 路径信息 pathInfo 和依赖信息 reliableInfo
    //但是遍历文件只会出现文件名，所以需要至少保留4层目录信息来预防有路径包含现象
    //类似 "sfosng.c": [sfx.h, aa.h, sfosng.h]
    //建立这个结构后，可以遍历然后，依赖禁止出现同名文件，如果真有同名文件，需要做特殊处理
    allMap: {},
    //只有头文件依赖关系，包含.h; .hpp，不存在.cpp依赖另一个.cpp的情况
    allMapOnlyHead: {},
    //搜索文件夹集合
    allFilesPath: [],

    //遍历所有c类文件, 生成allMap等数据
    //forInfo表示的是路径信息：路径数组
    foreachFiles: function (oneFilesPath, curPathInfo) {
        //找到此文件夹，获取子文件数组
        let subFiles = this.getSubFilesPath(oneFilesPath);
        let subFolders = this.getSubFoldersPath(oneFilesPath);
        let folderName = this.getCurFolder(oneFilesPath);

        //遍历此文件夹：type是node内部文件夹类型
        subFiles.forEach((filePath)=>this.dealWithFile(filePath, curPathInfo));

        subFolders.forEach((folderPath)=>{
            curPathInfo.push(folderName);
            this.foreachFiles(folderPath, curPathInfo);
            delete curPathInfo[curPathInfo.length-1];
        })
    },

    //处理此文件，插入数据结构中
    dealWithFile: function (file, forInfo) {
        //读取文件每一个行，查找#include这种东西，忽略IF宏的区别
        let fileName;
        let pathInfo;
        //构造一个nodeInfo
        let nodeInfo = {
            'pathInfo': pathInfo,
            'reliableInfo': {}
        }

        //遍历文件内容，填充nodeInfo数据


        //将nodeInfo添加入依赖数据中
        let findInfo = {
            'fileName': fileName,
            'findInfo':pathInfo
        };
        //没找到则需要加入，完全一样的话，产生异常，提示文件重复

        //查找并插入结构中
        let c_node_type = this.findFileInfo(findInfo);
        switch (c_node_type) {
            case nodeType.TYPE_0: {
                this.allMap[fileName] = nodeInfo;
                if(this.checkCLikeFile(fileName) === fileType.FILE_TYPE_H ||
                    this.checkCLikeFile(fileName) === fileType.FILE_TYPE_HPP ) {
                    //头文件格式，则加入 allMapOnlyHead
                    this.allMapOnlyHead[fileName] = nodeInfo;
                }
                break;
            }
            case nodeType.TYPE_ONLY_ONE: {
                //将结构改为数组，并插入
                break;
            }
            case nodeType.TYPE_SAME_NAME: {
                //插入数组中
                break;
            }
            default: {
                break;
            }
        }
    },

    //获取最后N个目录路径，用于 pathMatch 此方法
    //例如pathArr为[a,b,c,d]表示当前在d目录下，如果获取1个目录则是返回d
    getFilePathReverseN: function (pathArr, reverseN) {
        return pathArr && pathArr[pathArr.length-reverseN];
    },

    pathMatch: function (findPathInfo, pathInfo) {
        // 两个信息去返回匹配度
    },

    //查找依赖，一般可以根据fileName直接找到，但是如果有重复的文件，则需要遍历数组去查找 pathInfo 的匹配度
    findFileInfo: function (findInfo) {
        let fileName = findInfo["fileName"];
        let findPathInfo = findInfo["findInfo"];
        let nodeInfos = this.allMap[fileName];
        if(Array.isArray(nodeInfos)) {
            for (const index in nodeInfos) {
                let nodeInfo = nodeInfos[index];
                let pathInfo = nodeInfo["pathInfo"];
                if(this.pathMatch(findPathInfo, pathInfo)) {
                    return nodeType.TYPE_SAME_NAME;
                }
            }
            //没有找到依赖信息
            return nodeType.TYPE_0;
        }
        else {
            let nodeInfo = nodeInfos;
            return nodeType.TYPE_ONLY_ONE;
        }
    },

    //检查是不是C类文件
    //包括.c; .cpp; .h; .hpp; .cc这些
    checkCLikeFile: function (fileName) {
        if(fileName.slice(-2) === ".c") {
            return fileType.FILE_TYPE_C;
        }
        if(fileName.slice(-4) === ".cpp") {
            return fileType.FILE_TYPE_CPP;
        }
        if(fileName.slice(-3) === ".cc") {
            return fileType.FILE_TYPE_CC;
        }
        if(fileName.slice(-2) === ".h") {
            return fileType.FILE_TYPE_H;
        }
        if(fileName.slice(-4) === ".hpp") {
            return fileType.FILE_TYPE_HPP;
        }
        return fileType.FILE_TYPE_OTHERS;
    },

    //构建树形结构的依赖关系图
    buildPythonTree: function () {
        //调用python生成依赖关系图
    },

    getSubFilesPath: function (oneFilesPath) {
        //获取此文件目录下的文件集合
        let filesPath = [];
        return filesPath;
    },
    getSubFoldersPath: function (oneFilesPath) {
        //获取此文件目录下的文件夹集合
        let foldersPath = [];
        return foldersPath;
    },
    getCurFolder: function (oneFilesPath) {
        //获取此文件目录名字
        let folderName = "";
        return folderName;
    },

    //主流程
    mainFlow: function () {
        this.allFilesPath.forEach((oneFilesPath)=>{

            let curPathInfo = [];
            this.foreachFiles(oneFilesPath, curPathInfo);
        });
    }

}
