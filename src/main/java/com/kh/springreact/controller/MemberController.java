package com.kh.springreact.controller;

import com.kh.springreact.dto.MemberFormDto;
import com.kh.springreact.entity.Member;
import com.kh.springreact.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        String user = loginData.get("name");
        String pwd = loginData.get("password");
        boolean result = memberService.loginCheck(user, pwd);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 가압여부 확인 체크

    // 회원 가입
    @PostMapping("/new")
    public ResponseEntity<Boolean> memberRegister(@RequestBody Map<String, String> regData) {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setName(regData.get("name"));
        memberFormDto.setEmail(regData.get("email"));
        memberFormDto.setPassword(regData.get("password"));
        memberFormDto.setAddress(regData.get("address"));
        Member member = Member.createMember(memberFormDto);
        boolean result = memberService.saveMember(member);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 회원 조회
    @GetMapping("/member/{name}")
    public ResponseEntity<List<MemberFormDto>> memberList(@PathVariable("name") String name) {
        List<MemberFormDto> list = memberService.getMemberList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
