package com.kh.springreact.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "cart")
@Getter
@Setter
@ToString
public class Cart {
    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne // 일대일 매핑이며, 장바구니 엔티티가 회원 엔티티를 참조하는 일애일 단방향 매핑
    @JoinColumn(name = "member_id")
    private Member member;
}
