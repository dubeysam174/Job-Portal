import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  // ✅ Optimized filtering using useMemo
  const filteredCompanies = useMemo(() => {
    if (!searchCompanyByText) return companies;

    return companies.filter((company) =>
      company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase())
    );
  }, [companies, searchCompanyByText]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

return (
  <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    
    {/* 🔹 Card */}
    <div
      className="
        bg-white border border-gray-200 shadow-md rounded-2xl
        
        dark:bg-white/10 
        dark:backdrop-blur-xl 
        dark:border-white/20
      "
    >
      
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-white/20">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Companies
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Recently registered companies
        </p>
      </div>

      {/* Table */}
      <div className="p-5 overflow-x-auto">
        <Table className="text-sm">
          
          {/* 🔹 Table Header */}
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-white/20">
              <TableHead className="text-gray-600 dark:text-gray-300">
                Company
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300">
                Created
              </TableHead>
              <TableHead className="text-right text-gray-600 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* 🔹 Table Body */}
          <TableBody>
            {filteredCompanies?.length > 0 ? (
              filteredCompanies.map((company) => (
                <TableRow
                  key={company._id}
                  className="
                    border-gray-200 
                    dark:border-white/10 
                    hover:bg-gray-50 
                    dark:hover:bg-white/10 
                    transition
                  "
                >
                  
                  {/* Company */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={company.logo} />
                        <AvatarFallback className="bg-gray-200 dark:bg-white/20 text-gray-700 dark:text-white">
                          {company.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium text-gray-800 dark:text-white">
                        {company.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {formatDate(company?.createdAt)}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                        <MoreHorizontal className="text-gray-700 dark:text-gray-300" />
                      </PopoverTrigger>

                      <PopoverContent
                        className="
                          w-32 p-2 
                          bg-white border border-gray-200
                          
                          dark:bg-gray-800/80 
                          dark:backdrop-blur-md 
                          dark:border-white/10
                        "
                      >
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="
                            flex items-center gap-2 w-full px-2 py-1 text-sm rounded-md
                            hover:bg-gray-100 
                            dark:hover:bg-white/10 
                            text-gray-700 
                            dark:text-gray-200
                          "
                        >
                          <Edit2 className="w-4" />
                          Edit
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                >
                  No companies found 🚫
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);
};

export default CompaniesTable;