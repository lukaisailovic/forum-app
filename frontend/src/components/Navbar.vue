<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
           <b-container>
               <b-navbar-brand to="/">Forum</b-navbar-brand>

               <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

               <b-collapse id="nav-collapse" is-nav>
                   <b-navbar-nav>
                       <b-nav-item to="/">Home</b-nav-item>
                       <b-nav-item to="/about" >About</b-nav-item>
                   </b-navbar-nav>

                   <!-- Right aligned nav items -->
                   <b-navbar-nav class="ml-auto">
                       <b-nav-item-dropdown right>
                           <!-- Using 'button-content' slot -->
                           <template #button-content>
                               <em>User</em>
                           </template>
                           <b-dropdown-item href="#">Profile</b-dropdown-item>
                           <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                       </b-nav-item-dropdown>
                   </b-navbar-nav>
               </b-collapse>
           </b-container>
        </b-navbar>
    </div>
</template>



