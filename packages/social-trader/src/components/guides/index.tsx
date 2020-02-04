import "./guides.scss";

import classNames from "classnames";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import React, { useCallback, useState } from "react";

const navGuides = {
  trade: [
    {
      lesson: "Intro",
      isChecked: true,
      isAvailable: true
    },
    {
      lesson: "Step 1",
      isChecked: false,
      isAvailable: true
    },
    {
      lesson: "Step 2",
      isAvailable: true
    },
    {
      lesson: "Step 3",
      isAvailable: true
    },
    {
      lesson: "Step 4",
      isAvailable: false
    },
    {
      lesson: "Step 5",
      isAvailable: false
    }
  ],
  invest: [
    {
      lesson: "Intro",
      isChecked: false,
      isAvailable: true
    },
    {
      lesson: "Step 1",
      isAvailable: true
    },
    {
      lesson: "Step 2",
      isAvailable: true
    },
    {
      lesson: "Step 3",
      isAvailable: true
    },
    {
      lesson: "Step 4",
      isAvailable: true
    },
    {
      lesson: "Step 5",
      isAvailable: false
    }
  ],
  manage: [
    {
      lesson: "Intro",
      isChecked: true,
      isAvailable: true
    },
    {
      lesson: "Step 1",
      isAvailable: true
    },
    {
      lesson: "Step 2",
      isAvailable: false
    },
    {
      lesson: "Step 3",
      isAvailable: false
    },
    {
      lesson: "Step 4",
      isAvailable: false
    },
    {
      lesson: "Step 5",
      isAvailable: false
    }
  ]
};

const _GuidesContent: React.FC = () => {
  const [title, setTitle] = useState("Trade Intro");
  const { tab, setTab } = useTab<any>("Video");
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      if (
        e.target.querySelector("input") &&
        e.target.querySelector("input").disabled
      )
        return null;
      const input = e.target.className.includes("input")
        ? e.target
        : e.target.querySelector("input");
      const label = e.target.className.includes("input")
        ? e.target.parentNode
        : e.target;
      const activeLabel = document.querySelector(".label--active");
      if (activeLabel) activeLabel.classList.remove("label--active");
      label.classList.add("label--active");
      setTitle(input.value);
    },
    [setTitle]
  );
  return (
    <section>
      <h1>Genesis Vision Step By Step Guides</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <nav style={{ width: "20%" }}>
          <div>
            <h3>Trade</h3>
            <ul style={{ listStyleType: "none" }}>
              {navGuides.trade.map((item, index) => (
                <li key={index}>
                  <label
                    onClick={handleClick}
                    className={classNames("label", {
                      "label--active": index === 0
                    })}
                  >
                    <input
                      className="input"
                      type="checkbox"
                      value={`Trade ${item.lesson}`}
                      checked={item.isChecked}
                      disabled={!item.isAvailable}
                    />
                    {item.lesson}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Invest</h3>
            <ul style={{ listStyleType: "none" }}>
              {navGuides.invest.map((item, index) => (
                <li key={index}>
                  <label onClick={handleClick}>
                    <input
                      className="input"
                      type="checkbox"
                      value={`Invest ${item.lesson}`}
                      checked={item.isChecked}
                      disabled={!item.isAvailable}
                    />
                    {item.lesson}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Manage</h3>
            <ul style={{ listStyleType: "none" }}>
              {navGuides.manage.map((item, index) => (
                <li key={index}>
                  <label onClick={handleClick}>
                    <input
                      className="input"
                      type="checkbox"
                      value={`Manage ${item.lesson}`}
                      checked={item.isChecked}
                      disabled={!item.isAvailable}
                    />
                    {item.lesson}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div style={{ width: "80%" }}>
          <h2>{title}</h2>
          <DetailsBlockTabs value={tab} onChange={setTab}>
            <GVTab value="Video" label="Video" />
            <GVTab value="Descriptions" label="Descriptions" />
            <GVTab value="Task" label="Task" />
          </DetailsBlockTabs>
          {tab === "Video" && (
            <iframe
              width="966"
              height="543"
              src="https://www.youtube.com/embed/MSSWM6BwigY"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          )}

          {tab === "Descriptions" && (
            <>
              <h3>Descriptions</h3>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
            </>
          )}
          {tab === "Task" && (
            <>
              <h3>Task</h3>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click. Select a fund with a composition that matches your
                opinion on the market and let the manager readjust while the
                market evolves. You can withdraw your capital at any time you
                retain full control of your investment.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const GuidesContent = React.memo(_GuidesContent);
export default GuidesContent;
