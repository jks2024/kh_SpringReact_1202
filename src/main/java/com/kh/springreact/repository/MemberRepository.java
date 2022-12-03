package com.kh.springreact.repository;

import com.kh.springreact.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
    Member findByNameAndPassword(String name, String password);
}
