"use client";

import React, { useEffect } from 'react'
export const TypekitLoader = () => {
  useEffect(() => {
    if (typeof window === "undefined") return

    const d = document
    // JavaScript の読み込み
    var config = {
      kitId: process.env.NEXT_PUBLIC_ADOBE_FONTS_KITID,
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className =
        h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
    }, config.scriptTimeout),
    tk = d.createElement('script'),
    f = false,
    s = d.getElementsByTagName('script')[0],
    a
    h.className += ' wf-loading'
    tk.id = 'kit_id_' + process.env.NEXT_PUBLIC_ADOBE_FONTS_KITID
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js'
    tk.async = true
    // @ts-ignore
    tk.onload = tk.onreadystatechange = function () {
      // @ts-ignore
      a = this.readyState
      if (f || (a && a != 'complete' && a != 'loaded')) return
      f = true
      clearTimeout(t)
      try {
        // @ts-ignore
        Typekit.load(config)
      } catch (e) {}
    }
    // @ts-ignore
    s.parentNode.insertBefore(tk, s)
  }, [])

  return (<></>)
};