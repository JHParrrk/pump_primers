/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,

  isFirstEdit: true,
  todayId: 1,

  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  let storage = sessionStorage.getItem("store");
  if (!storage) {
    updateStorage();
    storage = sessionStorage.getItem("store");
  }

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    const newId = Date.now();
    const todayList = store.detailList[store.todayId] ?? [];
    const fundsAtTheTime = store.currentFunds;

    const newDetailItem = {
      id: newId,
      createAt: new Date(),
      description: newHistory.description,
      category: newHistory.category,
      amount: newHistory.amount,
      fundsAtTheTime: fundsAtTheTime - newHistory.amount,
    };

    store.detailList[store.todayId] = [...todayList, newDetailItem];
    store.currentFunds -= newHistory.amount;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    const targetList = store.detailList[dateId];
    if (!targetList) {
      return false;
    }

    const removedItem = targetList.find((item) => item.id === itemId);
    if (!removedItem) {
      return false;
    }

    store.currentFunds += removedItem.amount;
    store.detailList[dateId] = targetList.filter((item) => item.id !== itemId);

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
