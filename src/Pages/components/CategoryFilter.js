// CategoryFilter.js

import { useState } from "react";
import styled, { css } from "styled-components";

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: black;
`;
const CategoryFilterWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-top: 10px;
    position: absolute;
    right: 0;
`;

const Label = styled.label`
    display: flex;
    align-items: center;

    gap: 5px;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s;
`;

const CategorySpan = styled.span`
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    ${(props) => css`
        background-color: ${categoryBGColors[props.category] || "gray"};
        color: ${categoryColors[props.category] || "white"}
    `}
`;

const categoryBGColors = {
    "전체": "transparent",
    "취미": "#FFEBEB",
    "공부": "#E6F3FF",
    "가사": "#FFFCE8",
    "모임": "#E6F8EA",
    "기타": "#FDFDFD"
};
const categoryColors = {
    "전체": "white",
    "취미": "#E92C2C", // 레드
    "공부": "#0085FF", //파랑
    "가사": "#FF9F2D", //노랑
    "모임": "#00BA34", //초록
    "기타": "#585757"    
};

const categories = ["기타", "전체", "취미", "공부", "가사", "모임"];

const CategoryFilter = ({ selectedCategories, onCategoryChange }) => {
    const handleCheckboxChange = (category) => {
        if (category === "전체") {
            // 전체 선택 시 다른 카테고리 해제
            onCategoryChange(["전체"]);
        } else {
            // 전체가 이미 선택되어 있다면 해제
            const newCategories = selectedCategories.includes("전체")
                ? [category]
                : selectedCategories.includes(category)
                ? selectedCategories.filter((c) => c !== category) // 선택 해제
                : [...selectedCategories, category]; // 추가 선택
            
            //전체와 중복 선택 불가
            onCategoryChange(newCategories);
        }
    };

    return (
        <CategoryFilterWrapper>
            {categories.map((category) => (
                <Label key={category}>
                    <CategorySpan category={category}>{category}</CategorySpan>
                    <Checkbox
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category)}
                    />
                </Label>
            ))}
        </CategoryFilterWrapper>
    );
};

export default CategoryFilter;
