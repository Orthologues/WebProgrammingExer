package com.exercise.demo.hei;

public class HeiSuomi {
    private String msg;
    
    public HeiSuomi(String msg) { // constructor
        this.msg = msg.toUpperCase();
    }

    public void setMsg(String newMsg) {
        this.msg = newMsg.toUpperCase();
    }

    public String getMsg() {
        return msg;
    }

    @Override
    public String toString() {
        return String.format("Bean [message=%s]", msg);
    }
}
