import React, { Component } from "react";

import TableFilters from "./table-filters";

class TableToolbar extends Component {
  render() {
    const { title, renderFilters, updateFilter, filtering } = this.props;
    return (
      <div className="table__toolbar">
        {title && <div className="table__title">{title}</div>}
        {renderFilters && (
          <div className="table__filters">
            {renderFilters(updateFilter, filtering)}
          </div>
        )}
        <div>
          <svg width="15px" height="15px" viewBox="0 0 15 15">
            <g
              id="ui"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              opacity="1"
              stroke-linejoin="round"
            >
              <g
                id="1600_0_1_dashboard"
                transform="translate(-1434.000000, -963.000000)"
                stroke="#fff"
                stroke-width="1.5"
              >
                <g id="Group-22" transform="translate(120.000000, 880.000000)">
                  <g id="Group-78" transform="translate(32.000000, 40.000000)">
                    <g
                      id="Group-21-Copy-2"
                      transform="translate(1254.000000, 43.000000)"
                    >
                      <g
                        id="icon_cards"
                        transform="translate(29.000000, 1.000000)"
                      >
                        <polygon
                          id="Stroke-1"
                          points="0 3.54545455 3.54545455 3.54545455 3.54545455 0 0 0"
                        />
                        <polygon
                          id="Stroke-3"
                          points="9.45454545 3.54545455 13 3.54545455 13 0 9.45454545 0"
                        />
                        <polygon
                          id="Stroke-4"
                          points="0 13 3.54545455 13 3.54545455 9.45454545 0 9.45454545"
                        />
                        <polygon
                          id="Stroke-5"
                          points="9.45454545 13 13 13 13 9.45454545 9.45454545 9.45454545"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <svg width="14px" height="15px" viewBox="0 0 14 15">
            <g
              id="ui"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              stroke-linejoin="round"
            >
              <g
                id="1600_0_1_dashboard"
                transform="translate(-1406.000000, -963.000000)"
                stroke="#fff"
                stroke-width="1.5"
              >
                <g id="Group-22" transform="translate(120.000000, 880.000000)">
                  <g id="Group-78" transform="translate(32.000000, 40.000000)">
                    <g
                      id="Group-21-Copy-2"
                      transform="translate(1254.000000, 43.000000)"
                    >
                      <g id="icon_table">
                        <path
                          d="M0.388888889,1.24444444 L14,1.24444444"
                          id="Stroke-3"
                        />
                        <path
                          d="M0.388888889,7.54444444 L14,7.54444444"
                          id="Stroke-5"
                        />
                        <path
                          d="M0.388888889,13.8444444 L14,13.8444444"
                          id="Stroke-7"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default TableToolbar;
