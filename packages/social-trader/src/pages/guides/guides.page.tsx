import GuidesContainer from "pages/guides/guides.container";
import React, { useCallback, useState } from "react";

const navGuides = {
  trade: {
    title: "Trade",
    lessons: [
      {
        id: 0,
        lesson: "Intro",
        isDone: true,
        isAvailable: true
      },
      {
        id: 1,
        lesson: "Step 1",
        isDone: false,
        isAvailable: true
      },
      {
        id: 2,
        lesson: "Step 2",
        isAvailable: true
      },
      {
        id: 3,
        lesson: "Step 3",
        isAvailable: true
      },
      {
        id: 4,
        lesson: "Step 4",
        isAvailable: false
      },
      {
        id: 5,
        lesson: "Step 5",
        isAvailable: false
      }
    ]
  },
  invest: {
    title: "Invest",
    lessons: [
      {
        id: 6,
        lesson: "Intro",
        isDone: false,
        isAvailable: true
      },
      {
        id: 7,
        lesson: "Step 1",
        isAvailable: true
      },
      {
        id: 8,
        lesson: "Step 2",
        isAvailable: true
      },
      {
        id: 9,
        lesson: "Step 3",
        isDone: true,
        isAvailable: true
      },
      {
        id: 10,
        lesson: "Step 4",
        isAvailable: true
      },
      {
        id: 11,
        lesson: "Step 5",
        isAvailable: false
      }
    ]
  },
  manage: {
    title: "Manage",
    lessons: [
      {
        id: 12,
        lesson: "Intro",
        isDone: true,
        isAvailable: true
      },
      {
        id: 13,
        lesson: "Step 1",
        isAvailable: true
      },
      {
        id: 14,
        lesson: "Step 2",
        isAvailable: false
      },
      {
        id: 15,
        lesson: "Step 3",
        isAvailable: false
      },
      {
        id: 16,
        lesson: "Step 4",
        isAvailable: false
      },
      {
        id: 17,
        lesson: "Step 5",
        isAvailable: false
      }
    ]
  }
};

const _GuidesPage: React.FC = () => {
  return <GuidesContainer navGuides={navGuides} />;
};

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
