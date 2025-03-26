import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid fs-5">
  <Link to='/' className='text-decoration-none'><a class="navbar-brand text-light" href="#">Image Gallery</a></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav gap-lg-5 mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to='/' className='text-decoration-none'><a class="nav-link text-light active" aria-current="page" href="#">Home</a></Link>
        </li>
        <li class="nav-item">
        <Link to='/addphotos' className='text-decoration-none'><a class="nav-link text-light" href="#">Add Photos</a></Link>
        </li>
        <li class="nav-item">
        <Link to='/viewphoto' className='text-decoration-none'><a class="nav-link text-light">View Photos</a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar