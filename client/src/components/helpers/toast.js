import PropTypes from 'prop-types';

export const toast = ( container, value ) => {
    
    const topContainer = document.querySelector( container );

        const alert = document.createElement('div');
        alert.innerHTML = `
            <div class="toast show animate__animated animate__fadeInDown" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex justify-content-center">
                    <div class="toast-body">
                    <i class="fas fa-exclamation-circle px-1 text-danger"></i> ${ value }
                    </div>
                </div>
            </div>`;

        if ( !document.querySelector('.toast') && topContainer ) {

            topContainer.append(alert);
            
            setTimeout(() => {
                // Check if toast container exists, if so remove it
                ( document.querySelector('.toast')) &&
                    document.querySelector('.toast').remove();
            }, 3000);

        }

        // Prevent api key url exposures
        console.clear();
}

toast.propTypes = {
    container: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};
