@if (Auth::user())
    @extends('layouts.app')
@else
    @extends('layouts.guest')
@endif

@section('content')
    projets ascenseur 301
@endsection