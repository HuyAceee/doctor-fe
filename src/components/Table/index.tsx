import { useTranslation } from "react-i18next";
import { IAction } from "types/tableType";

interface ITableProps {
  cols: string[];
  rows: any[];
  fields: string[];
  actions: IAction[];
}

interface IDataTable {
  data: ITableProps;
}

const Table = ({ data }: IDataTable) => {
  const { t } = useTranslation();
  const { cols, rows, fields, actions } = data;
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg z-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {cols.map((col, index) => {
              return (
                <th key={index} scope="col" className="px-6 py-3">
                  {t(col)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                {Object.keys(row)
                  .filter((i) => fields.includes(i))
                  .map((_, index) => {
                    return (
                      <td key={index} className="px-6 py-4">
                        {row[fields[index]]}
                      </td>
                    );
                  })}
                <td className="px-6 py-4">
                  {actions &&
                    actions.map((action: any, index: number) => {
                      return (
                        <button
                          key={index}
                          onClick={() => action.handle(row.id)}
                          style={{ marginLeft: index ? 8 : 0 }}
                          className="text-black py-1 px-3 border-2 rounded-md"
                        >
                          {t(action.name)}
                        </button>
                      );
                    })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
