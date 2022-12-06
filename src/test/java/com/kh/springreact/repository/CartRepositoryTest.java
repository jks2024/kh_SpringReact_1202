package com.kh.springreact.repository;

import com.kh.springreact.dto.MemberFormDto;
import com.kh.springreact.entity.Cart;
import com.kh.springreact.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
class CartRepositoryTest {
    @Autowired
    CartRepository cartRepository;
    @Autowired
    MemberRepository memberRepository;

    public Member createMember() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setEmail("jks2024@email.com");
        memberFormDto.setName("곰돌이사육사");
        memberFormDto.setAddress("경기도 수원시 권선구 권선동");
        memberFormDto.setPassword("sphb8250");
        return Member.createMember(memberFormDto);
    }
    @Test
    @DisplayName("장바구니 회원 엔티티 매핑 조회 테스트")
    public void findCartAndMemberTest() {
        Member member = createMember();
        memberRepository.save(member);
        Cart cart = new Cart();
        cart.setMember(member);
        cartRepository.save(cart);

        Cart savedCart = cartRepository.findById(cart.getId()).orElseThrow(EntityNotFoundException::new);
        assertEquals(savedCart.getMember().getId(), member.getId());
    }

}