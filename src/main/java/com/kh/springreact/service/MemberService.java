package com.kh.springreact.service;

import com.kh.springreact.entity.Member;
import com.kh.springreact.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional // 로직을 처리하다가 에러가 발생하면 자동 롤백
@RequiredArgsConstructor // 생성자 주입
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    // 신규 회원 가입
    public boolean saveMember(Member member) {
        if(!validateDuplicateMember(member)) return false;
        memberRepository.save(member);
        return true;
    }
    // 신규 회원 가입을 위한 중복 가입 여부 확인
    private boolean validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember != null) {
            log.error("이미 가입된 회원 입니다.");
            return false;
        }
        return true;
    }
    // 로그인
    public boolean loginCheck(String name, String password) {
        Member regMember = memberRepository.findByNameAndPassword(name, password);
        if(regMember != null) return true;
        else return false;
    }

}
