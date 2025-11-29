import React from 'react'

export default function ContentHeader({ title, small, icon }) {
  return (
    <section className="content-header">
      <h1>
        {icon && <i className={`fa fa-${icon}`} ></i>}
        {title}
        <small style={{ marginLeft: 8 }}>{small}</small>
      </h1>
    </section>
  );
}
