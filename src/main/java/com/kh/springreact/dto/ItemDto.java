package com.kh.springreact.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ItemDto {
    private Long id;
    private Integer price;
    private String sellStatCd;
    private LocalDateTime regTime;
    private LocalDateTime updateTime;
}
