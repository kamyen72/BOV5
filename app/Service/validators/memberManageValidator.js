function memberManageValidator() {
    var self = this;
    var validatorResObj = {
        pass: true,
        errStatus: []
    };

    self.AddMember = function (userDataObj) {
        let errStatus = [];
        validatorResObj.pass = true;

        if (userDataObj.UserName == undefined || userDataObj.UserName == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 帳號不可為空！ <br/>' });
        }

        if (userDataObj.Birthday == undefined || userDataObj.Birthday == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 生日不可為空！ <br/>' });
        }

        if (userDataObj.Email == undefined || userDataObj.Email == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. Email不可為空！ <br/>' });
        }

        if (userDataObj.Phone == undefined || userDataObj.Phone == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 手機不可為空！ <br/>' });
        }

        //if (userDataObj.UserType == undefined || userDataObj.UserType == -1) {
        //    errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 用戶型態不可為空！ <br/>' });
        //}

        if (errStatus.length > 0) {
            validatorResObj.errStatus = errStatus;
            validatorResObj.pass = false;
        }

        return validatorResObj;
    };

    self.DelMember = function (member) {
        let errStatus = [];
        validatorResObj.pass = true;

        if (member == undefined || member == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 您選擇要刪除的項目有問題，請與系統管理者Confirm！ <br/>' });
        }

        if (errStatus.length > 0) {
            validatorResObj.errStatus = errStatus;
            validatorResObj.pass = false;
        }

        return validatorResObj;
    };

    self.FindNews = function (currentPage, pageSize, newsTitle, newsContent, isEnable, searchDateS, searchDateE) {

    };

    self.UpdateMember = function (userDataObj) {
        let errStatus = [];
        validatorResObj.pass = true;

        if (userDataObj.UserName == undefined || userDataObj.UserName == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 帳號不可為空！ <br/>' });
        }

        if (userDataObj.Birthday == undefined || userDataObj.Birthday == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 生日不可為空！ <br/>' });
        }

        if (userDataObj.Email == undefined || userDataObj.Email == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. Email不可為空！ <br/>' });
        }

        if (userDataObj.Phone == undefined || userDataObj.Phone == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 手機不可為空！ <br/>' });
        }

        //if (userDataObj.UserType == undefined || userDataObj.UserType == -1) {
        //    errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. 用戶型態不可為空！ <br/>' });
        //}

        if (errStatus.length > 0) {
            validatorResObj.errStatus = errStatus;
            validatorResObj.pass = false;
        }

        return validatorResObj;
    };
    
    self.ForgetPwd = function (userDataObj) {
        let errStatus = [];
        validatorResObj.pass = true;

        if (userDataObj.UserName == undefined || userDataObj.UserName == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. UserName不可為空！ <br/>' });
        }

        if (userDataObj.Email == undefined || userDataObj.Email == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. Email不可為空！ <br/>' });
        }

        if (errStatus.length > 0) {
            validatorResObj.errStatus = errStatus;
            validatorResObj.pass = false;
        }

        return validatorResObj;
    };

    self.Login = function (userDataObj) {
        let errStatus = [];
        validatorResObj.pass = true;

        if (userDataObj.UserName == undefined || userDataObj.UserName == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. UserName不可為空！ <br/>' });
        }

        if (userDataObj.Pwd == undefined || userDataObj.Pwd == '') {
            errStatus.push({ ErrIndex: '', ResMessage: (errStatus.length + 1) + '. Pwd不可為空！ <br/>' });
        }

        if (errStatus.length > 0) {
            validatorResObj.errStatus = errStatus;
            validatorResObj.pass = false;
        }

        return validatorResObj;
    };

}