app.directive("inputUploadBase64", ['$parse', '$q', function ($parse, $q) {
    function getFileBuffer(file) {
        var deferred = new $q.defer();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
    }
    function getBase64String(data) {
        return "data:image/" + data.extension + "; base64, " + data.file;
    }
    function readFile(file, fn) {
        var fileTypes = ['jpg', 'jpeg', 'png'];
        var extension = file.name.split('.').pop().toLowerCase(),
            isSuccess = fileTypes.indexOf(extension) > -1;

        if (isSuccess) {
            return getFileBuffer(file).then(function (resp) {
                fn({
                    file: resp.split(",")[1],
                    name: file.name,
                    extension: extension
                });
            });
        }
    }
    function isFileExist(infos, info) {
        for (var i = 0; i < infos.length; i++) {
            if (infos[i].name === info.name) {
                return true;
            }
        }
        return false;
    }
    return {
        restrict: "E",
        replace: true,
        scope: {
            fileModel: "=" //file,extension,name 基本三要素,
        },
        template: `<div>
                        <div ng-if="_imgSrc.length > 0">
                            <div ng-repeat="info in _imgSrc">
                                <img ng-src="{{info.src}}" class="img-responsiv" width="100%" id="uploadImage" />
                                <input type="button" class="btn btn-danger" value="Remove Img" ng-click="remove($index)">
                            </div>
                        </div>
                        <input id="uploadInput" type="file" multiple placeholder="" class="form-control input-md" accept="image/*" />
                    </div>`,
        controller: ['$scope', '$attrs', function ($scope, $attrs) {
            $scope._imgSrc = [];
            $scope.remove = function (idx) {
                $scope._imgSrc.splice(idx, 1);
                $scope.fileModel.splice(idx, 1);
                $scope.inputFile[0].value = '';
            };
            $scope.multiple = false;
            for (var i = 0; i < $scope.fileModel.length; i++) {
                if ($scope.fileModel[i].extension && $scope.fileModel[i].file) {
                    $scope._imgSrc.push({
                        src: getBase64String($scope.fileModel[i])
                    });
                }
            }
        }],
        link: function (scope, element, attrs) {
            var inputFile = element.find("input");
            scope.inputFile = inputFile;

            if (attrs.hasOwnProperty("multiple")) {
                inputFile.attr("multiple");
            } else {
                inputFile.removeAttr("multiple");
            }
            inputFile.bind("change", function () {
                var dom = this, files;

                if (dom.files && dom.files.length > 0) {
                    if (dom.files[0].type.indexOf("png") === -1) { 
                        alert("Please Select image with PNG Files");
                        scope.$broadcast("clearImage");
                        // scope.remove(0);
                        
                        return;
                    }
                    if (Object.prototype.toString.call(scope.fileModel) !== "[object Array]") {
                        data = scope.fileModel = [];
                    }
                    for (var i = 0; i < dom.files.length; i++) {
                        readFile(dom.files[i], function (data) {
                            if (scope.multiple) {
                                if (!isFileExist(scope.fileModel, data)) {
                                    scope.fileModel.push(data);
                                    scope._imgSrc.push({ src: getBase64String(data) });
                                }
                            } else {
                                scope.fileModel.length = 0;
                                scope._imgSrc.length = 0;
                                scope.fileModel.push(data);
                                scope._imgSrc.push({ src: getBase64String(data) });
                            }
                        });
                    }
                }
            });

            scope.$on("clearImage", function() {
                if(scope._imgSrc) scope._imgSrc.length = 0;
                if(scope.fileModel) scope.fileModel.length = 0;
                if(scope.inputFile) scope.inputFile[0].value = '';
            });
        }
    };
}]);