import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center">
							<h1 class="display-1 fw-bold">404</h1>
							<p class="h2">Page not found.</p>
							<p class="lead fw-normal mt-3 mb-4">The page you are looking for might have been removed.</p>
							<Link class="btn btn-primary btn-lg" to={'/'}>Return to website</Link>
						</div>

					</div>
				</div>
			</div>
		</div>
  )
}

export default Error404;
