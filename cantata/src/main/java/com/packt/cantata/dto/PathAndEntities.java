package com.packt.cantata.dto;

import com.packt.cantata.domain.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PathAndEntities {

    String midPath;
    User user;
    Performance performance;
    Brd_post brdPost;
}