package com.meizu.genbatis.exception;

public class ErrorCode implements BaseErrorCode {

    /**服务端数据库异常*/
    public enum ServerDb {
        /**未知*/
        UNKOWN(191000),
        /**数据不存在*/
        NOT_EXISTS(191001),
        /**数据已存在*/
        DATA_EXISTS(191002),
        /**数据保存失败*/
        DATA_SAVE_FAIL(191003),
        /**数据更新失败*/
        DATA_UPDATE_FAIL(191004);

        private int errorCode;

        private ServerDb( int errorCode ) {
            this.errorCode = errorCode;
        }

        public int getValue() {
            return errorCode;
        }

        @Override
        public String toString() {
            return String.valueOf( errorCode );
        }
    }

    /**服务端安全异常*/
    public enum ServerSecurity {
        /**未知*/
        UNKOWN(198000),
        /**签名错误*/
        SIGN_ERROR(198001),
        /**未登录*/
        NOT_LOGIN(198002),
        /**密码错误**/
        PASSWORD_ERROR(198003),
        /**禁止访问（IP过滤等）*/
        NOT_PERMIT(198004),
        /**访问过于频繁*/
        ACCESS_FREQUENT(198005);

        private int errorCode;

        private ServerSecurity( int errorCode ) {
            this.errorCode = errorCode;
        }

        public int getValue() {
            return errorCode;
        }

        @Override
        public String toString() {
            return String.valueOf( errorCode );
        }
    }

    public enum ServerBiz {
        /**未知*/
        UNKOWN(120000),
        /**参数错误：非法值*/
        PARAM_ERROR(120001),
        /**参数为空*/
        PARAM_EMPTY(120002),
        /**参数无效：枚举值以外的**/
        PARAM_INVALID(120003),
        /**业务上不允许操作*/
        NOT_OPERATE(120004),
        /**下架*/
        SHELF_DOWN(120005),
        /**状态错误*/
        STATUS_ERROR(120006),
        /**金额错误*/
        AMOUNT_ERROR(120007),
        /**用户错误*/
        USER_ERROR(120008),
        /**数据已过期(如活动) **/
        DATA_EXPIRED(120009),

        /**  协议不存在 **/
        AGREEMT_NOT_EXISTS(120010),
        /**  协议无效 **/
        AGREEMT_INVALID (120012),
        /**  代扣支付关闭 **/
        DUT_CLOSED(120013),
        /**  代扣支付超限 **/
        DUT_EXTEED(120014),
        /**  代扣支付失败，余额不足 **/
        DUT_PAY_FAIL(120015)
        ;

        private int errorCode;

        private ServerBiz( int errorCode ) {
            this.errorCode = errorCode;
        }

        public int getValue() {
            return errorCode;
        }

        @Override
        public String toString() {
            return String.valueOf( errorCode );
        }
    }

    public enum ServerDs {
        /**未知*/
        UNKOWN(192000),
        /**文件处理错误*/
        FILE_ERROR(192001);

        private int errorCode;

        private ServerDs( int errorCode ) {
            this.errorCode = errorCode;
        }

        public int getValue() {
            return errorCode;
        }

        @Override
        public String toString() {
            return String.valueOf( errorCode );
        }
    }

    public enum ServerThird {
        /**未知*/
        UNKOWN(194000),
        /** 网络请求错误**/
        HTTP_ERROR(194001),
        /**cdn错误*/
        CDN_ERROR(194002),
        /**CP异常*/
        CP_ERROR(194003),
        /**MQ异常*/
        MQ_ERROR(194004),
        /**REDIS异常*/
        REDIS_ERROR(194005);

        private int errorCode;

        private ServerThird( int errorCode ) {
            this.errorCode = errorCode;
        }

        public int getValue() {
            return errorCode;
        }

        @Override
        public String toString() {
            return String.valueOf( errorCode );
        }
    }
}
