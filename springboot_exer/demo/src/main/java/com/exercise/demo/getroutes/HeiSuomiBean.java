package com.exercise.demo.getroutes;

public class HeiSuomiBean {
    private String msg;
    
    public HeiSuomiBean(String msg) { // constructor
        this.msg = msg.toUpperCase();
    }

    public void setMsg(String newMsg) {
        this.msg = newMsg.toUpperCase();
    }

    public String getMsg() {
        return msg;
    }

    public String toString() {
        return String.format("Bean [message=%s]", msg);
    }
}
