import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities/index";

const OrderDetails = createContext();

// create a custom hook to check whether we're inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotals = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotals = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotals + toppingsSubtotals;

    setTotals({
      scoops: formatCurrency(scoopsSubtotals),
      toppings: formatCurrency(toppingsSubtotals),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      // get option Map and make a copy
      const { [optionType]: optionMap } = optionCounts;
      const newOptionMap = new Map(optionMap);

      //update the copied Map

      newOptionMap.set(itemName, parseInt(newItemCount));

      //create new object with the old optionCounts plus new map

      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      //update state

      setOptionCounts(newOptionCounts);
    }
    //getter: object containing option counts for scoops and toppings, subtotals and totals
    //setter: update option count

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
