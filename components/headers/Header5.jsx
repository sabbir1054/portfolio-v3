"use client";
import { openMobilemenu2 } from "@/utlis/toggleMobilemenu";
import Link from "next/link";
import React from "react";

export default function Header5() {
  return (
    <div className="tmp-responsive-header-style d-block d-xl-none header-onepage-mobile header--sticky">
      <div className="row align-items-center">
        <div className="col-6">
          <div className="logo">
            <Link href={`/`} className="brand-logo-text brand-lg">
              mdsabbir<span className="dot">.</span>dev
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className="header-right text-end">
            <div className="tmp-side-collups-area d-flex justify-content-end">
              <button
                className="tmp-menu-bars humberger_menu_active"
                onClick={openMobilemenu2}
              >
                <i className="fa-regular fa-bars-staggered"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
