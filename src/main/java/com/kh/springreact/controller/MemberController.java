package com.kh.springreact.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    // 로그인
    @PostMapping("/api/login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        String user = loginData.get("user");
        String pwd = loginData.get("pwd");
        log.info("아이디 : " + user);
        log.info("패스워드 : " + pwd);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    // 회원 가입
    @PostMapping("/api/reg-member")
    public ResponseEntity<Boolean> memberRegister(@RequestBody Map<String, String> regData) {
        String user = regData.get("user");
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
