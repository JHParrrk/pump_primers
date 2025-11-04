import { store, updateStorage } from "../store.js";
import { toHidden, toShow, formatNumberWithComma } from "../util.js";

const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");

export function initCurrentAsset() {
  renderCurrentAsset();
  addCurrentAssetEventListener();
}

function addCurrentAssetEventListener() {
  $currentAssetValue.addEventListener("click", function (event) {
    if (!store.isFirstEdit) return;
    toHidden(event.target);
    toShow($currentAssetInput);
    toShow($currentAssetButton);

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toHidden($currentAssetInput);
    toShow($currentAssetValue);

    // isFirstEdit가 false가 된 후에 소비내역 작성 버튼 나타남
    const $addItemButton = document.querySelector(".add-item-button");
    toShow($addItemButton);

    // 1. 상태(state)를 먼저 변경합니다.
    store.currentFunds = Number($currentAssetInput.value);
    store.isFirstEdit = false;
    updateStorage();

    // 2. 변경된 상태를 기반으로 화면을 다시 그립니다.
    renderCurrentAsset();
  });
}

export function renderCurrentAsset() {
  // 숫자에 콤마 작성
  // currentFunds가 없는 경우
  if (store.currentFunds != null && !store.isFirstEdit) {
    $currentAssetValue.textContent = formatNumberWithComma(store.currentFunds);
  } else {
    $currentAssetValue.textContent = "-";
  }
  $currentAssetInput.value = store.currentFunds;
}
