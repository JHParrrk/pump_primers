import { renderCurrentAsset } from "./current-asset.js";
import { store, removeHistory } from "../store.js";
import { formatNumberWithComma } from "../util.js";

const $sectionHistory = document.querySelector(".history");

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(Number(dateid), Number(itemid));
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

function formatTime(date) {
  const dateObj = new Date(date);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export function renderHistoryList() {
  // 데이터 매핑
  // 오름차순으로 목록 나열
  // 항목의 시간 포맷 변경: `HH:mm`
  // 금액 콤마 포맷 맞추기

  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      if (!detail?.length) return "";

      // 오름차순으로 정렬 (createAt 기준)
      const sortedDetail = [...detail].sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt)
      );

      const itemsHtml = sortedDetail
        .map((item) => {
          return `<section class="history-item">
        <section class="history-item-column">
          <div class="create-at">${formatTime(item.createAt)}</div>
          <div class="history-detail">
            <div class="history-detail-row history-detail-title">
              <p>${item.description}</p>
            </div>
            <div class="history-detail-row history-detail-subtitle">
              <p>${item.category}</p>
              <p>
                ${formatNumberWithComma(item.amount)}
                <span>원</span>
              </p>
            </div>
          </div>
          <div class="delete-section">
            <button class="delete-button" data-dateid="${dateId}" data-itemid="${
            item.id
          }">🗑</button>
          </div>
        </section>
        <section class="history-item-caption">
          <p>
            <span>남은 자산</span>
            <span>${formatNumberWithComma(item.fundsAtTheTime)}</span>
            <span>원</span>
          </p>
        </section>
      </section>`;
        })
        .join("");

      return `<article class="history-per-day">
      <p class="history-date">${formatDate(date)}</p>
      ${itemsHtml}
    </article>`;
    })
    .join("");
}
