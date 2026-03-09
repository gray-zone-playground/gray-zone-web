# Typography Guide (Pretendard)

이 문서는 프로젝트의 일관된 텍스트 스타일과 가독성을 위해 정의된 타이포그래피 가이드라인입니다. 모든 텍스트는 **Pretendard** 폰트를 기본으로 사용합니다.

## 1. Font Family

- **Primary Font**: `Pretendard Variable`, `Pretendard`
- **Fallback**: `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `Roboto`, `"Helvetica Neue"`, `"Segoe UI"`, `"Apple SD Gothic Neo"`, `"Noto Sans KR"`, `"Malgun Gothic"`, `sans-serif`

---

## 2. Text Style Hierarchy

| Name          | Size | Weight         | Line Height | Usage                             |
| :------------ | :--- | :------------- | :---------- | :-------------------------------- |
| **Display 1** | 40px | 700 (Bold)     | 1.2         | 대형 랜딩 페이지 메인 타이틀      |
| **Heading 1** | 32px | 700 (Bold)     | 1.3         | 페이지 주요 제목 (H1)             |
| **Heading 2** | 24px | 700 (Bold)     | 1.35        | 섹션 타이틀 (H2)                  |
| **Heading 3** | 20px | 600 (SemiBold) | 1.4         | 컨텐츠 그룹 제목 (H3)             |
| **Title 1**   | 18px | 600 (SemiBold) | 1.4         | 리스트 항목 제목, 모달 타이틀     |
| **Title 2**   | 16px | 600 (SemiBold) | 1.5         | 강조가 필요한 소제목, 버튼 텍스트 |
| **Body 1**    | 16px | 400 (Regular)  | 1.6         | 기본 본문 텍스트 (가독성 중심)    |
| **Body 2**    | 14px | 400 (Regular)  | 1.6         | 부연 설명, 폼 라벨, 리스트 본문   |
| **Caption 1** | 12px | 500 (Medium)   | 1.4         | 캡션, 뱃지, 데이터 테이블 헤더    |
| **Caption 2** | 10px | 400 (Regular)  | 1.4         | 보조 정보, 타임스탬프             |

---

## 3. 디자인 원칙 (Why & How)

### 왜 Pretendard인가?

1. **높은 가독성**: Apple의 San Francisco와 Google의 Roboto와 유사한 현대적인 인상을 주며, 한글과 영문 간의 자폭 조정이 매우 뛰어나 별도의 `letter-spacing` 조정 없이도 정갈해 보입니다.
2. **Variable Font 지원**: 굵기를 미세하게 조정할 수 있어 용량 최적화와 디자인 정교함을 동시에 잡을 수 있습니다.

### 왜 이 수치를 사용해야 하는가?

1. **Line Height (줄 간격)**:
   - 본문(Body)의 경우 가독성을 위해 1.6(160%)을 권장합니다. 줄 간격이 너무 좁으면 텍스트가 밀집되어 피로도가 높고, 너무 넓으면 시선이 분산됩니다.
   - 제목(Heading)은 크기가 크기 때문에 상대적으로 좁은 1.2~1.35 비율을 사용하여 시각적으로 단단하게 묶여 보이도록 유도합니다.
2. **시각적 위계 (Visual Hierarchy)**:
   - 사용자는 텍스트를 읽기 전 '스캔'합니다. 굵기(Weight)와 크기(Size)의 명확한 차이를 두어 사용자가 어떤 정보가 가장 중요한지 즉각적으로 판단할 수 있게 설계되었습니다.

---

## 4. Usage Tips

- **Color Matching**:
  - 본문(Body 1, 2)은 앞에서 정의한 `Gray 700`을 사용하세요.
  - 제목(Heading)은 `Gray 900`을 사용하여 명확한 대비를 만듭니다.
  - 캡션(Caption)은 `Gray 500`을 사용하여 시각적 우선순위를 낮춥니다.
- **Letter Spacing**: Pretendard는 기본 자간이 훌륭하지만, 제목(Heading)의 경우 `-0.02em` 정도의 미세한 자간 축소를 통해 더 세련된 느낌을 줄 수 있습니다.
