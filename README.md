<img src="example/snapshots/wcag-contrast/preview.svg"/>

# 목표

1. 예제로 주어진 Material-UI의 Color Palette의 WCAG Contrast Ratio 접근성을 계산합니다.
2. Git Pre-Commit Hook을 사용해서 Report를 작성합니다. (CI 상에서는 Report 파일들의 저장 문제 등 Back-End 비용이 발생하므로 Pre-Commit 상에서 진행합니다.)
3. CI (Github Actions) 에 PR이 발생하면 `master` Branch의 Report와 PR의 Report를 비교해서 Score 증감을 계산합니다.
4. Report의 증감이 있는 경우 PR에 Comment를 자동으로 달아줍니다.

# TODOs

- [x] WCAG Contrast Ratio Report
- [x] Git Pre-Commit Hook
- [x] Github Sticky Comment Library
- [ ] Github Action Bot

# Changes Pull Request