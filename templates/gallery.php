<?php
$gallery_group     = function_exists( 'get_field' ) ? get_field( 'gallery_section' ) : array();
$gallery_group_opt = function_exists( 'get_field' ) ? get_field( 'gallery_section', 'option' ) : array();

if ( ! is_array( $gallery_group ) ) {
    $gallery_group = array();
}
if ( ! is_array( $gallery_group_opt ) ) {
    $gallery_group_opt = array();
}

$gallery_items = array();
if ( ! empty( $gallery_group['gallery'] ) && is_array( $gallery_group['gallery'] ) ) {
    $gallery_items = $gallery_group['gallery'];
} elseif ( ! empty( $gallery_group['Gallery'] ) && is_array( $gallery_group['Gallery'] ) ) {
    $gallery_items = $gallery_group['Gallery'];
} elseif ( ! empty( $gallery_group_opt['gallery'] ) && is_array( $gallery_group_opt['gallery'] ) ) {
    $gallery_items = $gallery_group_opt['gallery'];
} elseif ( ! empty( $gallery_group_opt['Gallery'] ) && is_array( $gallery_group_opt['Gallery'] ) ) {
    $gallery_items = $gallery_group_opt['Gallery'];
}

$resolve_image_url = static function ( $image_value ) {
    if ( is_array( $image_value ) && ! empty( $image_value['url'] ) ) {
        return $image_value['url'];
    }
    if ( is_numeric( $image_value ) ) {
        return wp_get_attachment_image_url( (int) $image_value, 'full' );
    }
    if ( is_string( $image_value ) ) {
        return $image_value;
    }
    return '';
};
?>
<section id="gallery" class="section">
    <div class="container">
        <div class="section-header fade-in">
            <span style="color:var(--primary);font-weight:700;letter-spacing:1px">গ্যালারি</span>
            <h2>আলোকচিত্রে আমাদের কর্মকাণ্ড</h2>
            <div class="divider"></div>
        </div>

        <div id="galleryGrid" class="grid" data-initial-show="6" data-batch-size="6" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
            <?php if ( ! empty( $gallery_items ) ) : ?>
                <?php foreach ( $gallery_items as $item ) : ?>
                    <?php
                    $image_value = '';
                    if ( is_array( $item ) ) {
                        if ( ! empty( $item['image'] ) ) {
                            $image_value = $item['image'];
                        } elseif ( ! empty( $item['Image'] ) ) {
                            $image_value = $item['Image'];
                        }
                    }
                    $image_url = $resolve_image_url( $image_value );
                    if ( ! $image_url ) {
                        continue;
                    }
                    ?>
                    <button type="button" class="gallery-item fade-in gallery-popup-trigger" data-gallery-src="<?php echo esc_url( $image_url ); ?>" aria-label="Open gallery image">
                        <img src="<?php echo esc_url( $image_url ); ?>" alt="Gallery Image">
                    </button>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <div style="text-align:center;margin-top:28px">
            <button id="galleryLoadMoreBtn" class="btn btn-outline" type="button">আরও দেখুন</button>
        </div>
    </div>
</section>
